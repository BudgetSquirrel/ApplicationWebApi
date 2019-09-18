using BudgetTracker.BudgetSquirrel.WebApi.Tests.UnitTests;
using Microsoft.Extensions.Configuration;
using System;

namespace BudgetTracker.BudgetSquirrel.WebApi.Tests.UnitTests
{
    public class BaseUnitTest
    {
        protected TestStartup _startup;
        protected IServiceProvider _services;

        public BaseUnitTest()
        {
            _startup = TestStartup.Instance;
            _services = _startup.Services;
        }

        public E GetService<E>()
        {
            return (E) _services.GetService(typeof(E));
        }
    }
}
