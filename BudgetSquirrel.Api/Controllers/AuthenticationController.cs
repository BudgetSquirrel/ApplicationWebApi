using System;
using System.Security.Claims;
using System.Threading.Tasks;
using BudgetSquirrel.Api.Helpers;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Api.Services.Interfaces;
using GateKeeper.Exceptions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetSquirrel.Api 
{

    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IAuthService authenticationService;

        public AuthenticationController(IAuthService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpGet("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest credentials)
        {
            try
            {
                var user = await this.authenticationService.Authenticate(credentials);

                var claimsIdentity = new ClaimsIdentity(user.CreateUserClaims(), CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    new AuthenticationProperties { IsPersistent = true });

                return Ok(user);
            }
            catch (Exception ex) when (ex is AuthenticationException)
            {
                return this.BadRequest(ex.Message);
            }
        }

        // [HttpPost("create")]
        // public async Task<IActionResult> CreateUser([FromBody] RegisterRequest newUser)
        // {

        // }
    }
}