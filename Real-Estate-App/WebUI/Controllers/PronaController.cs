using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PronaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PronaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetByCategory")]
        public async Task<IActionResult> GetByCategory(string category)
        {
            IEnumerable<Prona> filteredProperties; // Use IEnumerable<Prona> to avoid conversion issues.

            switch (category.ToLower())
            {
                case "house":
                    filteredProperties = await _context.Pronas.OfType<Shtepia>().ToListAsync();
                    break;
                case "land":
                    filteredProperties = await _context.Pronas.OfType<Toka>().ToListAsync();
                    break;
                case "apartment":
                    filteredProperties = await _context.Pronas.OfType<Apartment>().ToListAsync();
                    break;
                default:
                    return BadRequest("Invalid category. Valid categories are 'Shtepia', 'Toka', or 'Apartment'.");
            }

            return Ok(filteredProperties);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllProperties()
        {
            var allProperties = await _context.Pronas.ToListAsync();
            return Ok(allProperties);
        }

        [HttpGet("GetFilteredProperties")]
        public async Task<IActionResult> GetFilteredProperties(
            string? location, // Optional location parameter
            string? category, // Optional category parameter (e.g., Apartment, Shtepia, Toka)
            double? maxPrice // Optional max price parameter
)
        {
            // Start with a query for all properties
            var query = _context.Pronas.AsQueryable();

            // Filter by location if provided
            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(p => p.Adresa.Contains(location));
            }

            // Filter by category if provided
            if (!string.IsNullOrEmpty(category))
            {
                switch (category.ToLower())
                {
                    case "house":
                        query = query.OfType<Shtepia>();
                        break;
                    case "land":
                        query = query.OfType<Toka>();
                        break;
                    case "apartment":
                        query = query.OfType<Apartment>();
                        break;
                    default:
                        return BadRequest("Invalid category. Valid categories are 'Shtepia', 'Toka', or 'Apartment'.");
                }
            }

            // Filter by max price if provided
            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            // Execute the query and retrieve the results
            var filteredProperties = await query.ToListAsync();

            return Ok(filteredProperties);
        }

    }
}
