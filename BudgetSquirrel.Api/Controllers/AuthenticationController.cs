using System.Threading.Tasks;
using BudgetSquirrel.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetSquirrel.Api 
{

    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpGet("login")]
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {
            
        }
    }
}