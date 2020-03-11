using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BudgetTracker.Business.Auth;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using GateKeeper.Repositories;
using GateKeeper.Exceptions;
using Microsoft.AspNetCore.Http;
using BudgetTracker.Business.Ports.Repositories;
using BudgetTracker.BudgetSquirrel.Application.Interfaces;

namespace BudgetTracker.BudgetSquirrel.WebApi.Auth
{
    public class AuthenticationService : IAuthenticationService
    {
        protected IGateKeeperUserRepository<User> _gateKeeperUserRepository;
        protected ICryptor _cryptor;

        protected GateKeeperConfig _gateKeeperConfig;
        private IHttpContextAccessor _httpContextAccessor;
        private IUserRepository _userRepository;

        public AuthenticationService(IGateKeeperUserRepository<User> gateKeeperUserRepository, ICryptor cryptor,
            GateKeeperConfig gateKeeperConfig, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository)
        {
            _gateKeeperUserRepository = gateKeeperUserRepository;
            _cryptor = cryptor;
            _gateKeeperConfig = gateKeeperConfig;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
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
            Claim usernameClaim = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (usernameClaim == null || string.IsNullOrEmpty(usernameClaim.Value))
                throw new AuthenticationException("No user associated with request");

            string username = usernameClaim.Value;

            User user = await _userRepository.GetByUsername(username);

            if (user == null)
                throw new AuthenticationException("This user does not exist");

            return user;
        }
    }
}