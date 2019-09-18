using BudgetTracker.BudgetSquirrel.WebApi.Tests.Utils;
using BudgetTracker.Business.Budgeting;
using BudgetTracker.TestUtils.Auth;
using BudgetTracker.TestUtils.Seeds;
using BudgetTracker.TestUtils.Budgeting;
using BudgetTracker.TestUtils.Transactions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;

namespace BudgetTracker.BudgetSquirrel.WebApi.Tests.UnitTests
{
    /// <summary>
    /// Startup logic for Unit Tests.
    /// </summary>
    public class TestStartup
    {
        private static TestStartup _singleton;
        private IServiceProvider _services;
        private IConfiguration _config;

        /// <summary>
        /// Instantiate the singleton instance of TestStartup.
        /// This is private to enforce the singleton pattern.
        /// </summary>
        private TestStartup()
        {}

        public static TestStartup Instance
        {
            get {
                if (_singleton == null)
                    _singleton = new TestStartup();
                return _singleton;
            }
        }

        public IServiceProvider Services
        {
            get {
                if (_services == null)
                {
                    IServiceCollection serviceBuilder = new ServiceCollection();
                    ConfigureServices(serviceBuilder);
                    _services = serviceBuilder.BuildServiceProvider();
                }
                return _services;
            }
        }

        public IConfiguration Config
        {
            get
            {
                if (_config == null)
                {
                    _config = new ConfigurationBuilder()
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false)
                        .AddJsonFile($"appsettings.Test.json", optional: true, reloadOnChange: false)
                        .AddEnvironmentVariables()
                        .Build();
                }

                return _config;
            }
        }

        private void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(Config);
            services.AddTransient<BudgetBuilderFactory<Budget>>();
            services.AddTransient<TransactionBuilderFactory>();
            services.AddTransient<UserFactory>();
            services.AddTransient<BasicSeed>();
            services.AddTransient<EncryptionHelper>();
        }
    }
}
