using BudgetTracker.BudgetSquirrel.WebApi;

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Xunit;

namespace BudgetTracker.BudgetSquirrel.WebApi.Tests.Utils
{
    public class TestClientProvider
    {
        public static HttpClient GetClient(TestServer server, IConfiguration config) {
            HttpClient client = server.CreateClient();
            return client;
        }

        public static TestServer GetServer(IConfiguration config) {
            var hostBuilder = new WebHostBuilder().UseConfiguration(config).UseStartup<Startup>();
            TestServer server = new TestServer(hostBuilder);
            return server;
        }
    }
}
