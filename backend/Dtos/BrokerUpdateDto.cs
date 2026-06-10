using System.ComponentModel.DataAnnotations;

namespace FreightOffers.Api.Dtos;

public class BrokerUpdateDto
{
    [Required, MaxLength(120)]
    public string CompanyName { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string ContactPerson { get; set; } = string.Empty;

    [Required, MaxLength(40)]
    public string Phone { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(150)]
    public string Email { get; set; } = string.Empty;
}
