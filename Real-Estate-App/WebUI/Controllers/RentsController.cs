using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _context.Set<Rent>()
                .Include(s => s.Users)
                .Include(s => s.Pronat)
                .ToListAsync();

            return Ok(sales);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRentById(int id)
        {
            var rent = await _context.Set<Rent>()
                .Include(s => s.Users)
                .Include(s => s.Pronat)
                .FirstOrDefaultAsync(s => s.RentId == id);

            if (rent == null)
            {
                return NotFound("Rent not found.");
            }

            return Ok(rent);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSale(string userId, int pronaId, [FromBody] Rent rent)
        {
            // Check if the model state is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the user by userId
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Find the property (Prona) by pronaId
            var prona = await _context.Pronas.FindAsync(pronaId);
            if (prona == null)
            {
                return NotFound(new { message = "Property not found" });
            }

            // Assign user and property to the sale
            rent.UserID = userId;
            rent.PronaID = pronaId;
            rent.Users = user;  // Linking user
            rent.Pronat = prona; // Linking property

            // Add the sale to the context
            _context.Rents.Add(rent);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return a Created response with the newly created sale
            return CreatedAtAction(nameof(GetRentById), new { id = rent.RentId }, rent);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSale(int id, [FromBody] Rent rent)
        {
            if (id != rent.RentId)
            {
                return BadRequest("ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(rent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentExists(id))
                {
                    return NotFound("Rent not found.");
                }

                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRent(int id)
        {
            var rent = await _context.Set<Rent>().FindAsync(id);

            if (rent == null)
            {
                return NotFound("Rent not found.");
            }

            _context.Set<Rent>().Remove(rent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RentExists(int id)
        {
            return _context.Set<Rent>().Any(s => s.RentId == id);
        }
    }
}
