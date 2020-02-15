using BudgetTracker.BudgetSquirrel.Application;
using BudgetTracker.BudgetSquirrel.Application.Messages.AuthenticationApi;
using BudgetTracker.BudgetSquirrel.Application.Messages;
using GateKeeper.Cryptogrophy;
using GateKeeper.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using BudgetTracker.BudgetSquirrel.WebApi.Auth;
using BudgetTracker.Business.Auth;

namespace BudgetTracker.BudgetSquirrel.WebApi.Controllers
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
        AuthConfig _authConfig;
        IAuthenticationService _authenticationService;

        public AuthenticationApiController(IAuthenticationApi authApi,
            AuthConfig authConfig, IAuthenticationService authenticationService)
        {
            _authApi = authApi;
            _authConfig = authConfig;
            _authenticationService = authenticationService;
        }

        [HttpPost("register")]
        public async Task<ApiResponse> Register(ApiRequest request)
        {
            return await _authApi.Register(request);
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
        /// Returns a new token with claims information for the user specified
        /// in the request. This token should be attached as a bearer token in
        /// sub-sequent requests that require authentication.
        /// </summary>
        /// <param name="data">
        /// A JSON object that contains 2 keys:
        /// - username
        /// - password
        /// These are used to authenticate the user for which this token is generated.
        /// </param>
        /// <returns>
        /// A JWT Token with claims information for the authenticated user. If
        /// the user cannot be authenticated, a 403 will be thrown.
        /// </returns>
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(Dictionary<string, string> data)
        {
            User authenticatedUser;
            UserResponseMessage userResponse;
            try
            {
                authenticatedUser = await _authenticationService.Authenticate(data["username"], data["password"]);
                userResponse = new UserResponseMessage(authenticatedUser);
            }
            catch (AuthenticationException)
            {
                return this.Forbid();
            }

            string securityKey = _authConfig.JWTSecurityKey;
            SymmetricSecurityKey symSecKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            SigningCredentials creds = new SigningCredentials(symSecKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, authenticatedUser.Username));
            
            DateTime expiration = DateTime.Now.AddHours(_authConfig.JWTDuration);
            JwtSecurityToken token = new JwtSecurityToken(issuer: _authConfig.JWTIssuer,
                                            audience: _authConfig.JWTAudience,
                                            expires: expiration,
                                            signingCredentials: creds,
                                            claims: claims);
            return new JsonResult(new {
                user = userResponse,
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expires = expiration
            });
        }
    }
}
