using BudgetSquirrel.Api.Tests.UnitTests;
using Microsoft.Extensions.Configuration;
using System;

namespace BudgetSquirrel.Api.Tests.UnitTests
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
