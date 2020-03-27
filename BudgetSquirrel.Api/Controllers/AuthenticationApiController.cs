using BudgetTracker.BudgetSquirrel.Application.Messages.AuthenticationApi;
using BudgetTracker.BudgetSquirrel.Application.Messages;
using GateKeeper.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using BudgetTracker.BudgetSquirrel.Application.Interfaces;

namespace BudgetSquirrel.Api.Controllers
{
    /// <summary>
    /// <p>
    /// The controller for the authentication API. All requests dealing with
    /// user accounts and authentication should be routed through here.
    /// </p>
    /// <p>
    /// This simply passes the request on to the code based API for authentication.
    /// </p>
    /// </summary>
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationApiController : ControllerBase
    {
        IAuthenticationApi _authApi;
        Application.Interfaces.IAuthenticationService _authenticationService;

        public AuthenticationApiController(IAuthenticationApi authApi, Application.Interfaces.IAuthenticationService authenticationService)
        {
            _authApi = authApi;
            _authenticationService = authenticationService;
        }

        /// <summary>
        /// Will register a new user in the database and return a new cookie session
        ///
        /// </summary>
        /// <param name="register">The user to be registered <see cref="Register"/></param>
        /// <returns>The newly authenticated users and a cookie for future requests</returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUser register)
        {
            //await _authApi.Register()
            return this.Ok();
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteUser(ApiRequest request)
        {
            try
            {
                return new JsonResult(await _authApi.DeleteUser(request));
            }
            catch(AuthenticationException)
            {
                return Forbid();
            }
        }

        /// <summary>
        /// Returns a new cookie with claims information for the user specified
        /// in the request. This cookie will persistent until the user logs out
        /// or the session times out.
        /// </summary>
        /// <param name="credentials">The username password used for the attempt to login <see cref="Credentials"/></param>
        /// <returns>
        /// A Cookie with claims information for the authenticated user. If
        /// the user cannot be authenticated, a 403 will be thrown.
        /// </returns>
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(Credentials credentials)
        {
            User authenticatedUser;
            UserResponseMessage userResponse;
            try
            {
                authenticatedUser = await _authenticationService.Authenticate(credentials.Username, credentials.Password);
                userResponse = new UserResponseMessage(authenticatedUser);
            }
            catch (AuthenticationException e)
            {
                // Potential logging here since this is an exception instead of a user issue.
                // still going to return a 400 so the user can't tell the difference
                return this.BadRequest();
            }

            if (authenticatedUser != null)
            {
                var cliamsIdenity = new ClaimsIdentity(authenticatedUser.CreateUserClaims(), CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(cliamsIdenity),
                    new AuthenticationProperties { IsPersistent = true});

                return this.Ok(authenticatedUser);
            }

            return this.BadRequest();
        }
    }
}
