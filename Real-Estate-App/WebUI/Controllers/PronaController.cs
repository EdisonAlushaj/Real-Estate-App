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
            IEnumerable<Prona> filteredProperties;

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
            var query = _context.Pronas.AsQueryable();

            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(p => p.Adresa.Contains(location));
            }

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

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            var filteredProperties = await query.ToListAsync();
            return Ok(filteredProperties);
        }

        // New method to get property details by ID
        [HttpGet("GetPropertyDetails")]
        public async Task<IActionResult> GetPropertyDetails([FromQuery] int id)
        {
            try
            {
                // Check if the ID is valid
                if (id <= 0)
                {
                    return BadRequest("Invalid property ID.");
                }

                // Fetch the property by ID
                var property = await _context.Pronas
                    .FirstOrDefaultAsync(p => p.PronaID == id);

                if (property == null)
                {
                    return NotFound("Property not found.");
                }

                return Ok(property);
            }
            catch (Exception ex)
            {
                // Log exception details for debugging
                Console.Error.WriteLine($"Error fetching property details: {ex.Message}");
                return StatusCode(500, "Internal server error while fetching property details.");
            }
        }


    }
}
