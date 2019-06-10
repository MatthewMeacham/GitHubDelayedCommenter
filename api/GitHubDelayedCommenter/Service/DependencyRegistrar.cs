using System;
using System.Collections.Generic;
using System.Text;
using Core.Service;
using DataAccess;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Service
{
    public static class DependencyRegistrar
    {
        public static void RegisterServiceDependencies(this IServiceCollection services)
        {
            services.AddScoped<IGitHubAuthenticationService, GitHubAuthenticationService>();

            services.RegisterDataAccessDependencies();
        }
    }
}
