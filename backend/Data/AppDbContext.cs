using FreightOffers.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FreightOffers.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<FreightOffer> FreightOffers => Set<FreightOffer>();
    public DbSet<Broker> Brokers => Set<Broker>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FreightOffer>(entity =>
        {
            entity.Property(offer => offer.BrokerName).IsRequired().HasMaxLength(120);
            entity.Property(offer => offer.PickupCity).IsRequired().HasMaxLength(100);
            entity.Property(offer => offer.DeliveryCity).IsRequired().HasMaxLength(100);
            entity.Property(offer => offer.Rate).HasPrecision(12, 2);
            entity.Property(offer => offer.EquipmentType).IsRequired().HasMaxLength(50);
            entity.Property(offer => offer.Status).IsRequired().HasMaxLength(30);
            entity.Property(offer => offer.Priority).IsRequired().HasMaxLength(30);
            entity.Property(offer => offer.DispatcherNotes).HasMaxLength(1000);
        });

        modelBuilder.Entity<Broker>(entity =>
        {
            entity.Property(broker => broker.CompanyName).IsRequired().HasMaxLength(120);
            entity.Property(broker => broker.ContactPerson).IsRequired().HasMaxLength(100);
            entity.Property(broker => broker.Phone).IsRequired().HasMaxLength(40);
            entity.Property(broker => broker.Email).IsRequired().HasMaxLength(150);
        });
    }
}
