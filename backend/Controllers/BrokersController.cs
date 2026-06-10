using FreightOffers.Api.Data;
using FreightOffers.Api.Dtos;
using FreightOffers.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FreightOffers.Api.Controllers;

[ApiController]
[Route("api/brokers")]
public class BrokersController : ControllerBase
{
    private readonly AppDbContext _context;

    public BrokersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Broker>>> GetAll()
    {
        var brokers = await _context.Brokers
            .AsNoTracking()
            .OrderBy(broker => broker.CompanyName)
            .ToListAsync();

        return Ok(brokers);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Broker>> GetById(int id)
    {
        var broker = await _context.Brokers.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);

        return broker is null ? NotFound() : Ok(broker);
    }

    [HttpPost]
    public async Task<ActionResult<Broker>> Create(BrokerCreateDto dto)
    {
        var now = DateTime.UtcNow;
        var broker = new Broker
        {
            CompanyName = dto.CompanyName,
            ContactPerson = dto.ContactPerson,
            Phone = dto.Phone,
            Email = dto.Email,
            CreatedAt = now,
            UpdatedAt = now
        };

        _context.Brokers.Add(broker);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = broker.Id }, broker);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Broker>> Update(int id, BrokerUpdateDto dto)
    {
        var broker = await _context.Brokers.FindAsync(id);
        if (broker is null)
        {
            return NotFound();
        }

        broker.CompanyName = dto.CompanyName;
        broker.ContactPerson = dto.ContactPerson;
        broker.Phone = dto.Phone;
        broker.Email = dto.Email;
        broker.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(broker);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var broker = await _context.Brokers.FindAsync(id);
        if (broker is null)
        {
            return NotFound();
        }

        _context.Brokers.Remove(broker);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
