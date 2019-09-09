using BudgetTracker.Business.Budgeting;
using BudgetTracker.TestUtils.Auth;
using BudgetTracker.TestUtils.Budgeting;
using BudgetTracker.TestUtils.Seeds;
using BudgetTracker.TestUtils.Transactions;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace BudgetTracker.BudgetSquirrel.WebApi.Tests.Utils
{
    public class TestServiceProvider
    {
        public static IServiceProvider GetServiceProvider(IConfiguration config)
        {
            ServiceCollection services = new ServiceCollection();
            ConfigureServices(services, config);

            IServiceProvider serviceProvider = services.BuildServiceProvider();
            return serviceProvider;
        }

        private static void ConfigureServices(IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<BudgetBuilderFactory<Budget>>();
            services.AddScoped<TransactionBuilderFactory>();
            services.AddScoped<UserFactory>();
            services.AddScoped<BasicSeed>();
        }
    }
}
