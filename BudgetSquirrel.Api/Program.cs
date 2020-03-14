using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BudgetSquirrel.Data.EntityFramework;

namespace BudgetSquirrel.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IWebHost host = CreateWebHostBuilder(args).Build();

            Task preflightOperationsTask = PerormPreflightOperations(host, args);

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();

        private static async Task PerormPreflightOperations(IWebHost host, string[] args)
        {
            if (args.Contains("--seed") || args.Contains("-s"))
            {
                throw new NotImplementedException("Seeding is not implemented");
                // using (IServiceScope scope = host.Services.CreateScope())
                // {
                //     IServiceProvider services = scope.ServiceProvider;
                //     BudgetSquirrelContext context = services.GetRequiredService<BudgetSquirrelContext>();
                //     IConfiguration appConfig = services.GetRequiredService<IConfiguration>();
                //     BasicSeed seeder = new BasicSeed(context, appConfig);
                //     await seeder.Seed();
                // }
            }
        }
    }
}
