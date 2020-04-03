using BudgetSquirrel.Api.EntityFrameworkTooling;
using BudgetSquirrel.Data.EntityFramework;
using BudgetSquirrel.Services.Implementations;
using BudgetSquirrel.Services.Interfaces;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BudgetSquirrel.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddSingleton<IConfiguration>(Configuration);

            ConfigureAuthenticationServices(services);
        }

        protected void ConfigureAuthenticationServices(IServiceCollection services)
        {
            ConfigureGateKeeperServices(services);
            //services.AddTransient<IAuthService, AuthService>();
        }

        protected void ConfigureGateKeeperServices(IServiceCollection services)
        {
            GateKeeperConfig gateKeeperConfig = ConfigurationReader.FromAppConfiguration(Configuration);
            services.AddSingleton<GateKeeperConfig>(gateKeeperConfig);

            services.AddTransient<ICryptor, Rfc2898Encryptor>();
        }

        protected void ConfigureDataLayer(IServiceCollection services)
        {
            services.AddDbContext<BudgetSquirrelContext, AppDbContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("Default"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
