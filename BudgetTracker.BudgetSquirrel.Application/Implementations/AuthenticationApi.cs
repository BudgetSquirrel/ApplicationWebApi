using BudgetTracker.BudgetSquirrel.Application.Interfaces;
using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetTracker.BudgetSquirrel.Application.Messages.AuthenticationApi;
using BudgetTracker.Business.Auth;
using BudgetTracker.Business.Auth.Messages;
using BudgetTracker.Business.Ports.Repositories;
using System;
using System.Threading.Tasks;

namespace BudgetTracker.BudgetSquirrel.Application
{
    /// <summary>
    /// <p>
    /// Provides an API for the authentication logic for this application. With
    /// this API, one can register new users, login, logout and more.
    /// </p>
    /// </summary>
    public class AuthenticationApi : ApiBase, IAuthenticationApi
    {
        IUserRepository _userRepository;
        private AccountCreator _accountCreator;

        public AuthenticationApi(IAuthenticationService authenticationService,
            IUserRepository userRepository, AccountCreator accountCreator)
            : base(authenticationService)
        {
            _userRepository = userRepository;
            _accountCreator = accountCreator;
        }

        /// <summary>
        /// <p>
        /// Allows a user to register a new account.
        /// </p>
        /// </summary>
        public async Task<ApiResponse> Register(RegisterUser registerUser)
        {
            try
            {
                await _accountCreator.Register(registerUser);
                return new ApiResponse(new ApiResponse(new { success = true }));
            }
            catch (Exception e)
            {
                return new ApiResponse(e.Message);
            }
        }

        public async Task<ApiResponse> DeleteUser(ApiRequest request)
        {
            ApiResponse response;
            User authenticatedUser = await Authenticate();

            try
            {
                await ((IUserRepository) _userRepository).Delete(authenticatedUser.Id.Value);
                response = new ApiResponse();
            }
            catch (InvalidOperationException)
            {
                response = new ApiResponse("Could not find the specified user.");
            }
            return response;
        }
    }
}
