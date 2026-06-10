using System.ComponentModel.DataAnnotations;

namespace FreightOffers.Api.Dtos;

public class FreightOfferUpdateDto
{
    [Required, MaxLength(120)]
    public string BrokerName { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string PickupCity { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string DeliveryCity { get; set; } = string.Empty;

    public DateOnly PickupDate { get; set; }
    public DateOnly DeliveryDate { get; set; }

    [Range(0, double.MaxValue)]
    public decimal Rate { get; set; }

    [Range(0, int.MaxValue)]
    public int Miles { get; set; }

    [Range(0, int.MaxValue)]
    public int Weight { get; set; }

    [Required, MaxLength(50)]
    public string EquipmentType { get; set; } = string.Empty;

    [Required, MaxLength(30)]
    public string Status { get; set; } = string.Empty;

    [Required, MaxLength(30)]
    public string Priority { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? DispatcherNotes { get; set; }
}
