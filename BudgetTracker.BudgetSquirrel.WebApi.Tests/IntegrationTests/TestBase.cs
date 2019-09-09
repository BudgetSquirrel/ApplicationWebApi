using BudgetTracker.BudgetSquirrel.WebApi.Tests.Utils;
using System;

namespace BudgetTracker.BudgetSquirrel.WebApi.Tests.IntegrationTests
{
    public class TestBase
    {
        protected TestStartup _startup;

        public TestBase()
        {
            _startup = TestStartup.Instance;
        }
    }
}
