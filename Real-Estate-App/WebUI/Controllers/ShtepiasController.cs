﻿using System;
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
    public class ShtepiasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ShtepiasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Shtepias
        [HttpGet]
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
        [HttpGet("{id}")]
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
        [HttpPut("{id}")]
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

        // POST: api/Shtepias
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Shtepia>> PostShtepia(Shtepia shtepia)
        {
            try
            {
                _context.Shtepiat.Add(shtepia);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetShtepia", new { id = shtepia.PronaID }, shtepia);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating new record.");
            }
        }

        // DELETE: api/Shtepias/5
        [HttpDelete("{id}")]
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

                return NoContent();
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
