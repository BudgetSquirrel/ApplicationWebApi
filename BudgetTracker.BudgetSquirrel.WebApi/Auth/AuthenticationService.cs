using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BudgetTracker.BudgetSquirrel.Application;
using BudgetTracker.Business.Auth;
using BudgetTracker.Data.EntityFramework.Repositories;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using GateKeeper.Repositories;
using GateKeeper.Exceptions;
using Microsoft.AspNetCore.Http;

namespace BudgetTracker.BudgetSquirrel.WebApi.Auth
{
    public class AuthenticationService : IAuthenticationService
    {
        protected IGateKeeperUserRepository<User> _gateKeeperUserRepository;
        protected ICryptor _cryptor;

        protected GateKeeperConfig _gateKeeperConfig;
        private HttpContext _httpContext;
        private UserRepository _userRepository;

        public AuthenticationService(IGateKeeperUserRepository<User> gateKeeperUserRepository, ICryptor cryptor,
            GateKeeperConfig gateKeeperConfig, HttpContext httpContext)
        {
            _gateKeeperUserRepository = gateKeeperUserRepository;
            _cryptor = cryptor;
            _gateKeeperConfig = gateKeeperConfig;
            _httpContext = httpContext;
        }

        /// <summary>
        /// Authenticates the user login, returning that user if authorized. Otherwise,
        /// this will throw a <see cref="AuthenticationException" />.
        /// </summary>
        public async Task<User> Authenticate(string username, string password)
        {
            User user = await GateKeeper.Authentication.Authenticate(username, password,
                _gateKeeperUserRepository, _cryptor, _gateKeeperConfig);
            return user;
        }

        public async Task<User> GetCurrentUser()
        {
            Claim usernameClaim = _httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            string username = usernameClaim.Value;

            if (string.IsNullOrEmpty(username))
                throw new AuthenticationException("No user associated with request");

            User user = await _userRepository.GetByUsername(username);

            if (user == null)
                throw new AuthenticationException("This user does not exist");

            return user;
        }
    }
}