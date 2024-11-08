using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Infrastructure.Data;

namespace WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TokasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Tokas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Toka>>> GetTokat()
        {
            try
            {
                return await _context.Tokat.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database.");
            }
        }

        // GET: api/Tokas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Toka>> GetToka(int id)
        {
            try
            {
                var toka = await _context.Tokat.FindAsync(id);

                if (toka == null)
                {
                    return NotFound();
                }

                return toka;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database.");
            }
        }

        // PUT: api/Tokas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutToka(int id, Toka toka)
        {
            if (id != toka.PronaID)
            {
                return BadRequest();
            }

            _context.Entry(toka).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TokaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating the data.");
            }

            return NoContent();
        }

        // POST: api/Tokas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Toka>> PostToka(Toka toka)
        {
            try
            {
                _context.Tokat.Add(toka);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetToka", new { id = toka.PronaID }, toka);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating new record.");
            }
        }

        // DELETE: api/Tokas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToka(int id)
        {
            try
            {
                var toka = await _context.Tokat.FindAsync(id);
                if (toka == null)
                {
                    return NotFound();
                }

                _context.Tokat.Remove(toka);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }
        }

        private bool TokaExists(int id)
        {
            try
            {
                return _context.Tokat.Any(e => e.PronaID == id);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
