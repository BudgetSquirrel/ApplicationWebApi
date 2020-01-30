using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetTracker.Business.Auth;
using GateKeeper;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using GateKeeper.Models;
using GateKeeper.Repositories;
using System;
using System.Threading.Tasks;

namespace BudgetTracker.BudgetSquirrel.Application
{
    public class ApiBase
    {
        protected IGateKeeperUserRepository<User> _gateKeeperUserRepository;
        protected ICryptor _cryptor;

        protected GateKeeperConfig _gateKeeperConfig;
        IAuthenticationService _authenticationService;

        public ApiBase(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        /// <summary>
        /// Authenticates the user login, returning that user if authorized. Otherwise,
        /// this will throw a <see cref="AuthenticationException" />.
        /// </summary>
        public Task<User> Authenticate()
        {
            return _authenticationService.GetCurrentUser();
        }
    }
}
