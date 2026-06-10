using Microsoft.AspNetCore.Mvc;

namespace FreightOffers.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "Healthy",
            application = "Freight Offers API"
        });
    }
}
