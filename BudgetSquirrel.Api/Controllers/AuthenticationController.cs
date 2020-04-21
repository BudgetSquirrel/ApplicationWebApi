using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Api.Services.Interfaces;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Data.EntityFramework.Converters;
using BudgetSquirrel.Data.EntityFramework.Models;
using BudgetSquirrel.Data.EntityFramework.Repositories.Interfaces;
using GateKeeper.Exceptions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetSquirrel.Api
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IAuthService authenticationService;
        private readonly IAccountService accountService;
        private readonly IUserRepository userRepository;

        public AuthenticationController(IAuthService authenticationService,
                                        IAccountService accountService,
                                        IUserRepository userRepository)
        {
            this.authenticationService = authenticationService;
            this.accountService = accountService;
            this.userRepository = userRepository;
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            User user = await this.authenticationService.GetCurrentUser();
            return new JsonResult(user);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest credentials)
        {
            try
            {
                UserRecord user = await this.authenticationService.Authenticate(credentials);

                if (user != null)
                {
                    await this.authenticationService.SignInAsync(user);
                    User userResponse = UserConverter.ToDomainModel(user);
                    return new JsonResult(userResponse);
                }
                
                return this.BadRequest("Username or Password were incorrect");
            }
            catch (Exception ex) when (ex is AuthenticationException)
            {
                return this.BadRequest("Username or Password were incorrect");
            }
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterRequest newUser)
        {
            await this.accountService.CreateUser(newUser);

            UserRecord userRecord = await this.userRepository.GetByUsername(newUser.Username);
            await this.authenticationService.SignInAsync(userRecord);
            User user = UserConverter.ToDomainModel(userRecord);

            return new JsonResult(user);
        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await this.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return this.Ok();
        }
    }
}