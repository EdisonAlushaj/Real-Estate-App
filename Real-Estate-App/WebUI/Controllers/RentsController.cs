using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet, Authorize(Policy = "AgentPolicy")]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _context.Set<Rent>()
                .Include(s => s.Users)
                .Include(s => s.Pronat)
                .ToListAsync();

            return Ok(sales);
        }

        [HttpGet("{id}"), Authorize(Policy = "UserPolicy")]
        public async Task<IActionResult> GetRentByUserId(string id)
        {
            var rent = await _context.Set<Rent>()
                .Include(s => s.Users)
                .Include(s => s.Pronat)
                .FirstOrDefaultAsync(s => s.UserID == id);

            if (rent == null)
            {
                return NotFound("Rent not found.");
            }

            return Ok(rent);
        }

        [HttpPost, Authorize(Policy = "UserPolicy")]
        public async Task<IActionResult> CreateSale(string userId, int pronaId, [FromBody] Rent rent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            var prona = await _context.Pronas.FindAsync(pronaId);
            if (prona == null)
            {
                return NotFound(new { message = "Property not found" });
            }

            rent.UserID = userId;
            rent.PronaID = pronaId;
            rent.Users = user;
            rent.Pronat = prona;

            _context.Rents.Add(rent);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRentByUserId), new { id = rent.RentId }, rent);
        }

        [HttpPut("{id}"), Authorize(Policy = "UserPolicy")]
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

        [HttpDelete("{id}"), Authorize(Policy = "AdminPolicy")]
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
