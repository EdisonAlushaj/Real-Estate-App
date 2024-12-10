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
    public class ShtepiasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ShtepiasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Shtepias
        [HttpGet, Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<IEnumerable<Shtepia>>> GetShtepiat()
        {
            try
            {
                return await _context.Shtepiat.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database.");
            }
        }

        // GET: api/Shtepias/5
        [HttpGet("{id}"), Authorize(Policy = "AgentPolicy")]
        public async Task<ActionResult<Shtepia>> GetShtepia(int id)
        {
            try
            {
                var shtepia = await _context.Shtepiat.FindAsync(id);

                if (shtepia == null)
                {
                    return NotFound();
                }

                return shtepia;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database.");
            }
        }

        // PUT: api/Shtepias/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize(Policy = "AgentPolicy")]
        public async Task<IActionResult> PutShtepia(int id, Shtepia shtepia)
        {
            if (id != shtepia.PronaID)
            {
                return BadRequest();
            }

            _context.Entry(shtepia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShtepiaExists(id))
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
        public async Task<ActionResult<Shtepia>> PostShtepiat([FromForm] ShtepiaCreateDto shtepiaDto)
        {
            try
            {
                string photoPath = null;

                if (shtepiaDto.Photo != null)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images", "Shtepia-Img");
                    Directory.CreateDirectory(uploadsFolder);

                    var fileName = $"{Guid.NewGuid()}{Path.GetExtension(shtepiaDto.Photo.FileName)}";
                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await shtepiaDto.Photo.CopyToAsync(fileStream);
                    }

                    photoPath = Path.Combine("Images", "Shtepia-Img", fileName);
                }

                var shtepia = new Shtepia
                {
                    Emri = shtepiaDto.Emri,
                    Adresa = shtepiaDto.Adresa,
                    Price = shtepiaDto.Price,
                    Description = shtepiaDto.Description,
                    Status = shtepiaDto.Status,
                    Photo = photoPath,
                    size = shtepiaDto.size,
                    nrFloors = shtepiaDto.nrFloors,
                    kaGarazhd = shtepiaDto.kaGarazhd,
                    kaPool = shtepiaDto.kaPool
                };

                _context.Shtepiat.Add(shtepia);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetShtepiat", new { id = shtepia.PronaID }, shtepia);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating new record: " + ex.Message);
            }
        }

        // DELETE: api/Shtepias/5
        [HttpDelete("{id}"), Authorize(Policy = "AgentPolicy")]
        public async Task<IActionResult> DeleteShtepia(int id)
        {
            try
            {
                var shtepia = await _context.Shtepiat.FindAsync(id);
                if (shtepia == null)
                {
                    return NotFound();
                }

                _context.Shtepiat.Remove(shtepia);
                await _context.SaveChangesAsync();

                return Ok(await _context.Shtepiat.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }
        }

        private bool ShtepiaExists(int id)
        {
            try
            {
                return _context.Shtepiat.Any(e => e.PronaID == id);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
