using BudgetTracker.BudgetSquirrel.WebApi.Tests.Utils;
using BudgetTracker.Data.EntityFramework;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace BudgetTracker.BudgetSquirrel.WebApi.Tests.IntegrationTests
{
    public class TestBase : IDisposable
    {
        protected TestStartup _startup;
        protected BudgetTrackerContext _dbContext;
        protected EncryptionHelper _encryptionHelper;

        private IServiceScope _serverServiceScope;

        /// <summary>
        /// Contains services configured in the server. These are configured
        /// in the servers Startup, not this TestStartup.
        /// </summary>
        protected IServiceProvider _serverServices;

        public TestBase()
        {

            _startup = TestStartup.Instance;
            _serverServices = _startup.Server.Host.Services;
            ResetServerServiceScope();

            _dbContext.Database.EnsureDeleted();
            _dbContext.Database.EnsureCreated();

            _encryptionHelper = GetTestUtilService<EncryptionHelper>();
        }

        /// <summary>
        /// Gets a service of the given type from the test server.
        /// To get a test utility server such as builders and factories,
        /// use <see cref="GetTestUtilService<T>()" />
        /// </summary>
        public T GetTestServerService<T>() => (T) _serverServices.GetService(typeof(T));

        /// <summary>
        /// Gets a service of the given type from the test startup.
        /// To get a service in the server such as the DbContext or repositories,
        /// use <see cref="GetTestServerService<T>()" />
        /// </summary>
        public T GetTestUtilService<T>() => (T) _startup.Services.GetService(typeof(T));

        public void ResetServerServiceScope()
        {
            if (_serverServiceScope != null) _serverServiceScope.Dispose();
            _serverServiceScope = _startup.Server.Host.Services.CreateScope();
            _serverServices = _serverServiceScope.ServiceProvider;
            _dbContext = GetTestServerService<BudgetTrackerContext>();
        }

        public void Dispose()
        {
        }
    }
}
