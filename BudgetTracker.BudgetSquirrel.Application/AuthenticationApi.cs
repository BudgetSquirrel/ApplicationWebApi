using BudgetTracker.BudgetSquirrel.Application;
using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetTracker.BudgetSquirrel.Application.Messages.AuthenticationApi;
using BudgetTracker.Business.Converters;
using BudgetTracker.Business.Auth;
using BudgetTracker.Business;
using BudgetTracker.Common;
using BudgetTracker.Business.Ports.Repositories;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using GateKeeper.Exceptions;
using GateKeeper.Repositories;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.BudgetSquirrel.Application
{
    /// <summary>
    /// <p>
    /// Provides an API for the authentication logic for this application. With
    /// this API, one can register new users, login, logout and more.
    /// </p>
    /// </summary>
    public class AuthenticationApi : ApiBase<User>, IAuthenticationApi
    {
        IUserRepository _userRepository;
        private AccountCreator _accountCreator;

        public AuthenticationApi(IGateKeeperUserRepository<User> gateKeeperUserRepository, IUserRepository userRepository,
            IConfiguration appConfig, AccountCreator accountCreator)
            : base(gateKeeperUserRepository, new Rfc2898Encryptor(),
                    ConfigurationReader.FromAppConfiguration(appConfig))
        {
            _userRepository = userRepository;
            _accountCreator = accountCreator;
        }

        /// <summary>
        /// <p>
        /// Allows a user to register a new account.
        /// </p>
        /// </summary>
        public async Task<ApiResponse> Register(ApiRequest request)
        {
            UserRegistrationArgumentApiMessage arguments = request.Arguments<UserRegistrationArgumentApiMessage>();
            RegisterUserMessage userValues = arguments.UserValues;

            try
            {
                await _accountCreator.Register(userValues);
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
            User authenticatedUser = await Authenticate(request);

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
