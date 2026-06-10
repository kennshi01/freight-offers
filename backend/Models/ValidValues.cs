namespace FreightOffers.Api.Models;

public static class ValidValues
{
    public static readonly string[] Statuses = { "New", "Reviewed", "Accepted", "Rejected" };
    public static readonly string[] EquipmentTypes = { "Dry Van", "Reefer", "Flatbed", "Step Deck" };
    public static readonly string[] Priorities = { "Low", "Medium", "High" };
}
