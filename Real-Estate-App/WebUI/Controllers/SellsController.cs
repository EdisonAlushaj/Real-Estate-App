using Domain.Entities;
using Infrastructure.Data;
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

        [HttpGet]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _context.Set<Sell>()
                .Include(s => s.Users)
                .Include(s => s.Pronat)
                .ToListAsync();

            return Ok(sales);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSaleById(int id)
        {
            var sale = await _context.Set<Sell>()
                .Include(s => s.Users)
                .Include(s => s.Pronat)
                .FirstOrDefaultAsync(s => s.SellID == id);

            if (sale == null)
            {
                return NotFound("Sale not found.");
            }

            return Ok(sale);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSale(string userId, int pronaId, [FromBody] Sell sale)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            sale.UserID = userId;
            sale.PronaID = pronaId;

            _context.Set<Sell>().Add(sale);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSaleById), new { id = sale.SellID }, sale);
        }


        [HttpPut("{id}")]
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

        [HttpDelete("{id}")]
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
