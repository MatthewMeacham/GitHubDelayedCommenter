using Core.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Web
{
    public class Startup
    {
        private const string AllowLocalhostOrigin = "AllowLocalhostOrigin";

        public IConfiguration Configuration { get; }
        public IHostingEnvironment HostingEnvironment { get; }

        public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(AllowLocalhostOrigin,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
                    });
            });
            services.AddMvc();
            services.AddOptions();
            services.Configure<GitHubSettings>(Configuration.GetSection("GitHubSettings"));

            services.RegisterWebDependencies();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(AllowLocalhostOrigin);
            app.UseMvc();
        }
    }
}
