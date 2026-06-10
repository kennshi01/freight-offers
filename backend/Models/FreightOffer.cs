namespace FreightOffers.Api.Models;

public class FreightOffer
{
    public int Id { get; set; }
    public string BrokerName { get; set; } = string.Empty;
    public string PickupCity { get; set; } = string.Empty;
    public string DeliveryCity { get; set; } = string.Empty;
    public DateOnly PickupDate { get; set; }
    public DateOnly DeliveryDate { get; set; }
    public decimal Rate { get; set; }
    public int Miles { get; set; }
    public int Weight { get; set; }
    public string EquipmentType { get; set; } = string.Empty;
    public string Status { get; set; } = "New";
    public string Priority { get; set; } = "Medium";
    public string? DispatcherNotes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
