using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Application.DTO;

namespace WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApartmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<IEnumerable<Apartment>>> GetApartments()
        {
            try
            {
                return await _context.Apartments.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database.");
            }
        }

        [HttpGet("{id}"), Authorize(Policy = "AgentPolicy")]
        public async Task<ActionResult<Apartment>> GetApartment(int id)
        {
            try
            {
                var apartment = await _context.Apartments.FindAsync(id);

                if (apartment == null)
                {
                    return NotFound();
                }

                return apartment;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database.");
            }
        }

        [HttpPut("{id}"), Authorize(Policy = "AgentPolicy")]
        public async Task<IActionResult> PutApartment(int id, Apartment apartment)
        {
            if (id != apartment.PronaID)
            {
                return BadRequest();
            }

            _context.Entry(apartment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error updating the record. Concurrency issue.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating the data.");
            }

            return NoContent();
        }

        [HttpPost, Authorize(Policy = "AgentPolicy")]
        public async Task<ActionResult<Apartment>> PostApartment([FromForm] ApartmentCreateDto apartmentDto)
        {
            try
            {
                string photoPath = null;

                if (apartmentDto.Photo != null)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images", "Apartment-Img");
                    Directory.CreateDirectory(uploadsFolder);

                    var fileName = $"{Guid.NewGuid()}{Path.GetExtension(apartmentDto.Photo.FileName)}";
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await apartmentDto.Photo.CopyToAsync(fileStream);
                    }

                    photoPath = Path.Combine("Images", "Apartment-Img", fileName);
                }

                var apartment = new Apartment
                {
                    Emri = apartmentDto.Emri,
                    Adresa = apartmentDto.Adresa,
                    Price = apartmentDto.Price,
                    Description = apartmentDto.Description,
                    Status = apartmentDto.Status,
                    Photo = photoPath,
                    floor = apartmentDto.floor,
                    nrDhomave = apartmentDto.nrDhomave,
                    kaAnshensor = apartmentDto.kaAnshensor
                };

                _context.Apartments.Add(apartment);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetApartment", new { id = apartment.PronaID }, apartment);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating new record: " + ex.Message);
            }
        }

        [HttpDelete("{id}"), Authorize(Policy = "AgentPolicy")]
        public async Task<IActionResult> DeleteApartment(int id)
        {
            try
            {
                var apartment = await _context.Apartments.FindAsync(id);
                if (apartment == null)
                {
                    return NotFound();
                }

                _context.Apartments.Remove(apartment);
 
                                await _context.SaveChangesAsync();

                return Ok(await _context.Apartments.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }
        }

        private bool ApartmentExists(int id)
        {
            try
            {
                return _context.Apartments.Any(e => e.PronaID == id);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
