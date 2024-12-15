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
    public class SellsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SellsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize(Policy = "AgentPolicy")]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _context.Set<Sell>()
                .Include(s => s.Users)
                .Include(s => s.Pronat)
                .ToListAsync();

            return Ok(sales);
        }

        [HttpGet("{id}"), Authorize(Policy = "UserPolicy")]
        public async Task<IActionResult> GetSaleByUserId(string id)
        {
            var sale = await _context.Set<Sell>()
                .Include(s => s.Users)
                .Include(s => s.Pronat)
                .FirstOrDefaultAsync(s => s.UserID == id);

            if (sale == null)
            {
                return NotFound("Sale not found.");
            }

            return Ok(sale);
        }

        [HttpPost, Authorize(Policy = "UserPolicy")]
        public async Task<IActionResult> CreateSale(string userId, int pronaId, [FromBody] Sell sale)
        {
            try
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

                sale.UserID = userId;
                sale.PronaID = pronaId;
                sale.Users = user;
                sale.Pronat = prona;

                _context.Sells.Add(sale);

                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetSaleByUserId), new { id = sale.SellID }, sale);
            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine($"Database error: {dbEx.Message}");
                return StatusCode(500, new { message = "An error occurred while saving to the database." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, new { message = "An unexpected error occurred. Please try again later." });
            }
        }


        [HttpPut("{id}"), Authorize(Policy = "UserPolicy")]
        public async Task<IActionResult> UpdateSale(int id, [FromBody] Sell sale)
        {
            if (id != sale.SellID)
            {
                return BadRequest("ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(sale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound("Sale not found.");
                }

                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}"), Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            var sale = await _context.Set<Sell>().FindAsync(id);

            if (sale == null)
            {
                return NotFound("Sale not found.");
            }

            _context.Set<Sell>().Remove(sale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleExists(int id)
        {
            return _context.Set<Sell>().Any(s => s.SellID == id);
        }
    }
}
