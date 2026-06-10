using FreightOffers.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FreightOffers.Api.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await context.Database.EnsureCreatedAsync();

        if (await context.Brokers.AnyAsync() || await context.FreightOffers.AnyAsync())
        {
            return;
        }

        var now = DateTime.UtcNow;

        context.Brokers.AddRange(
            new Broker
            {
                CompanyName = "BlueLine Logistics",
                ContactPerson = "Sarah Mitchell",
                Phone = "(312) 555-0184",
                Email = "sarah@bluelinelogistics.com",
                CreatedAt = now,
                UpdatedAt = now
            },
            new Broker
            {
                CompanyName = "Summit Freight Partners",
                ContactPerson = "James Carter",
                Phone = "(404) 555-0132",
                Email = "james@summitfreight.com",
                CreatedAt = now,
                UpdatedAt = now
            },
            new Broker
            {
                CompanyName = "NorthStar Transport",
                ContactPerson = "Emily Brooks",
                Phone = "(313) 555-0198",
                Email = "emily@northstartransport.com",
                CreatedAt = now,
                UpdatedAt = now
            }
        );

        context.FreightOffers.AddRange(
            CreateOffer("BlueLine Logistics", "Chicago, IL", "Dallas, TX", new DateOnly(2026, 6, 12), new DateOnly(2026, 6, 14), 2850, 925, 42000, "Dry Van", "New", "High", now),
            CreateOffer("Summit Freight Partners", "Atlanta, GA", "Miami, FL", new DateOnly(2026, 6, 11), new DateOnly(2026, 6, 12), 1750, 665, 36500, "Reefer", "Reviewed", "Medium", now),
            CreateOffer("NorthStar Transport", "Detroit, MI", "Nashville, TN", new DateOnly(2026, 6, 13), new DateOnly(2026, 6, 14), 2100, 535, 39000, "Flatbed", "Accepted", "Medium", now),
            CreateOffer("BlueLine Logistics", "Phoenix, AZ", "Denver, CO", new DateOnly(2026, 6, 15), new DateOnly(2026, 6, 17), 2450, 865, 28000, "Step Deck", "Rejected", "Low", now),
            CreateOffer("Summit Freight Partners", "Boston, MA", "Newark, NJ", new DateOnly(2026, 6, 14), new DateOnly(2026, 6, 15), 1550, 225, 41000, "Reefer", "New", "High", now)
        );

        await context.SaveChangesAsync();
    }

    private static FreightOffer CreateOffer(
        string brokerName,
        string pickupCity,
        string deliveryCity,
        DateOnly pickupDate,
        DateOnly deliveryDate,
        decimal rate,
        int miles,
        int weight,
        string equipmentType,
        string status,
        string priority,
        DateTime now)
    {
        return new FreightOffer
        {
            BrokerName = brokerName,
            PickupCity = pickupCity,
            DeliveryCity = deliveryCity,
            PickupDate = pickupDate,
            DeliveryDate = deliveryDate,
            Rate = rate,
            Miles = miles,
            Weight = weight,
            EquipmentType = equipmentType,
            Status = status,
            Priority = priority,
            DispatcherNotes = string.Empty,
            CreatedAt = now,
            UpdatedAt = now
        };
    }
}
