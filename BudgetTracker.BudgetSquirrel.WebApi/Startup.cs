using BudgetTracker.BudgetSquirrel.Application;
using BudgetTracker.Business.Auth;
using BudgetTracker.Data.EntityFramework;
using BudgetTracker.Business.Ports.Repositories;
using BudgetTracker.Data.EntityFramework.Repositories;
using BudgetTracker.BudgetSquirrel.WebApi.Data;
using GateKeeper.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using BudgetTracker.Business.Budgeting;
using BudgetTracker.Business.Converters.BudgetConverters;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading.Tasks;
using BudgetTracker.BudgetSquirrel.Application.Interfaces;
using BudgetTracker.BudgetSquirrel.WebApi.Auth;

namespace BudgetTracker.BudgetSquirrel.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        private readonly string AllowDevOrigin = "_allowDevOrigin";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => {
                options.AddPolicy(AllowDevOrigin,
                builder => {
                    builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                });
            });
            services.AddHttpContextAccessor();

            ConfigureFrontEnd(services);
            
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });


            services.AddSingleton<IConfiguration>(Configuration);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddDbContext<BudgetTrackerContext, AppDbContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("Default"));
            });

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IGateKeeperUserRepository<User>, UserRepository>();
            services.AddTransient<ITransactionRepository, TransactionRepository>();
            services.AddTransient<IBudgetRepository, BudgetRepository>();

            services.AddTransient<IAuthenticationApi, AuthenticationApi>();
            services.AddTransient<IBudgetApi, BudgetApi>();
            services.AddTransient<ITransactionApi, TransactionApi>();

            services.AddTransient<BudgetValidator>();
            services.AddTransient<BudgetCreator>();

            services.AddTransient<BudgetMessageConverter>();

            ConfigureAuthServices(services);
            ConfigureBudgetServices(services);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            });

            services.AddAuthentication();
        }

        protected virtual void ConfigureFrontEnd(IServiceCollection services)
        {
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        protected virtual void ConfigureAuthServices(IServiceCollection services)
        {
            GateKeeperConfig gateKeeperConfig = ConfigurationReader.FromAppConfiguration(Configuration);
            services.AddSingleton<GateKeeperConfig>(gateKeeperConfig);
            services.AddTransient<ICryptor, Rfc2898Encryptor>();

            services.AddTransient<IAuthenticationService, AuthenticationService>();
            services.AddTransient<AccountCreator>();

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options => {
                    options.Events.OnRedirectToLogin = context => 
                    {
                        // Returns a 401 if the user attempts to access the site unauthenticated.
                        context.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    };
                    // Can set the time out here. 
                    // options.ExpireTimeSpan = new System.TimeSpan();
                }
            );
        }

        protected virtual void ConfigureBudgetServices(IServiceCollection services)
        {
            services.AddTransient<BudgetUpdater>();
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
            app.UseSpaStaticFiles();
            app.UseCookiePolicy();

            app.UseAuthentication();
            // app.UseAuthorization();

            app.UseCors(AllowDevOrigin);

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

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
