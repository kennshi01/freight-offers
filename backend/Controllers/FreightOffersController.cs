using FreightOffers.Api.Data;
using FreightOffers.Api.Dtos;
using FreightOffers.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FreightOffers.Api.Controllers;

[ApiController]
[Route("api/freight-offers")]
public class FreightOffersController : ControllerBase
{
    private readonly AppDbContext _context;

    public FreightOffersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FreightOffer>>> GetAll(
        [FromQuery] string? pickupCity,
        [FromQuery] string? deliveryCity,
        [FromQuery] string? status,
        [FromQuery] string? equipmentType,
        [FromQuery] string? priority)
    {
        var query = _context.FreightOffers.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(pickupCity))
        {
            query = query.Where(offer => offer.PickupCity.Contains(pickupCity));
        }

        if (!string.IsNullOrWhiteSpace(deliveryCity))
        {
            query = query.Where(offer => offer.DeliveryCity.Contains(deliveryCity));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(offer => offer.Status == status);
        }

        if (!string.IsNullOrWhiteSpace(equipmentType))
        {
            query = query.Where(offer => offer.EquipmentType == equipmentType);
        }

        if (!string.IsNullOrWhiteSpace(priority))
        {
            query = query.Where(offer => offer.Priority == priority);
        }

        return Ok(await query.OrderByDescending(offer => offer.CreatedAt).ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<FreightOffer>> GetById(int id)
    {
        var offer = await _context.FreightOffers.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);

        return offer is null ? NotFound() : Ok(offer);
    }

    [HttpPost]
    public async Task<ActionResult<FreightOffer>> Create(FreightOfferCreateDto dto)
    {
        var validationError = ValidateOffer(dto.Status, dto.EquipmentType, dto.Priority, dto.PickupDate, dto.DeliveryDate);
        if (validationError is not null)
        {
            return BadRequest(validationError);
        }

        var now = DateTime.UtcNow;
        var offer = new FreightOffer
        {
            BrokerName = dto.BrokerName,
            PickupCity = dto.PickupCity,
            DeliveryCity = dto.DeliveryCity,
            PickupDate = dto.PickupDate,
            DeliveryDate = dto.DeliveryDate,
            Rate = dto.Rate,
            Miles = dto.Miles,
            Weight = dto.Weight,
            EquipmentType = dto.EquipmentType,
            Status = dto.Status,
            Priority = dto.Priority,
            DispatcherNotes = dto.DispatcherNotes,
            CreatedAt = now,
            UpdatedAt = now
        };

        _context.FreightOffers.Add(offer);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = offer.Id }, offer);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<FreightOffer>> Update(int id, FreightOfferUpdateDto dto)
    {
        var offer = await _context.FreightOffers.FindAsync(id);
        if (offer is null)
        {
            return NotFound();
        }

        var validationError = ValidateOffer(dto.Status, dto.EquipmentType, dto.Priority, dto.PickupDate, dto.DeliveryDate);
        if (validationError is not null)
        {
            return BadRequest(validationError);
        }

        offer.BrokerName = dto.BrokerName;
        offer.PickupCity = dto.PickupCity;
        offer.DeliveryCity = dto.DeliveryCity;
        offer.PickupDate = dto.PickupDate;
        offer.DeliveryDate = dto.DeliveryDate;
        offer.Rate = dto.Rate;
        offer.Miles = dto.Miles;
        offer.Weight = dto.Weight;
        offer.EquipmentType = dto.EquipmentType;
        offer.Status = dto.Status;
        offer.Priority = dto.Priority;
        offer.DispatcherNotes = dto.DispatcherNotes;
        offer.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(offer);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var offer = await _context.FreightOffers.FindAsync(id);
        if (offer is null)
        {
            return NotFound();
        }

        _context.FreightOffers.Remove(offer);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static string? ValidateOffer(
        string status,
        string equipmentType,
        string priority,
        DateOnly pickupDate,
        DateOnly deliveryDate)
    {
        if (!ValidValues.Statuses.Contains(status))
        {
            return $"Status must be one of: {string.Join(", ", ValidValues.Statuses)}.";
        }

        if (!ValidValues.EquipmentTypes.Contains(equipmentType))
        {
            return $"Equipment type must be one of: {string.Join(", ", ValidValues.EquipmentTypes)}.";
        }

        if (!ValidValues.Priorities.Contains(priority))
        {
            return $"Priority must be one of: {string.Join(", ", ValidValues.Priorities)}.";
        }

        if (deliveryDate < pickupDate)
        {
            return "Delivery date cannot be before pickup date.";
        }

        return null;
    }
}
