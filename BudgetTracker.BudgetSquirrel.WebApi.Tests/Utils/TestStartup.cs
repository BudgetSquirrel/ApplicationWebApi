using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace BudgetTracker.BudgetSquirrel.WebApi.Tests.Utils
{
    public class TestStartup
    {
        private static TestStartup _singleton;
        private IConfiguration _config;
        private TestServer _server;
        private HttpClient _client;

        /// <summary>
        /// Services for the tests. This only contains test utilities.
        /// The _server has it's own set of services such as the DbContext
        /// and repositories. This service provider is configured in the
        /// TestStartup.
        /// </summary>
        private IServiceProvider _services;

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

        public IServiceProvider Services
        {
            get {
                if (_services == null)
                {
                    _services = TestServiceProvider.GetServiceProvider(Config);
                }
                return _services;
            }
        }

        public HttpRequestMessage GetJsonRequest(string uri, object data, string method)
        {
            var httpMethod = new HttpMethod(method);

            var requestMessage = new HttpRequestMessage(httpMethod, uri);
            requestMessage.Content = new StringContent(JsonConvert.SerializeObject(data));
            requestMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return requestMessage;
        }

        public HttpClient Client
        {
            get {
                if (_client == null)
                {
                    _client = TestClientProvider.GetClient(Server, Config);
                }
                return _client;
            }
        }

        public TestServer Server
        {
            get {
                if (_server == null)
                {
                    _server = TestClientProvider.GetServer(Config);
                }
                return _server;
            }
        }

        public async Task<HttpResponseMessage> SendJsonMessage(string uri, object jsonMessage, string method) {
            HttpResponseMessage response = await Client.SendAsync(GetJsonRequest(uri, jsonMessage, method));
            return response;
        }
    }
}
