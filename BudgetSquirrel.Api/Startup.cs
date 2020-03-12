using BudgetTracker.BudgetSquirrel.Application;
using BudgetSquirrel.Api.Authorization;
using BudgetSquirrel.Api.Data;
using GateKeeper.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using BudgetSquirrel.Data.EntityFramework;
using BudgetSquirrel.Business.Auth;

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
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });


            services.AddSingleton<IConfiguration>(Configuration);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddDbContext<BudgetSquirrelContext, AppDbContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("Default"));
            });

            services.AddTransient<IGateKeeperUserRepository<User>, UserRepository>();

            services.AddTransient<IAuthenticationApi, AuthenticationApi>();
            services.AddTransient<IBudgetApi, BudgetApi>();
            services.AddTransient<ITransactionApi, TransactionApi>();

            ConfigureAuthServices(services);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            });

            services.AddAuthentication(options =>
            {
                options.DefaultChallengeScheme = "basic-authentication-scheme";

                // you can also skip this to make the challenge scheme handle the forbid as well
                options.DefaultForbidScheme = "basic-authentication-scheme";

                // of course you also need to register that scheme, e.g. using
                options.AddScheme<BasicAuthenticationHandler>("basic-authentication-scheme", "scheme display name");
            });
        }

        protected virtual void ConfigureAuthServices(IServiceCollection services)
        {
            services.AddTransient<AccountCreator>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
