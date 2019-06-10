using System;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess
{
    public static class DependencyRegistrar
    {
        public static void RegisterDataAccessDependencies(this IServiceCollection services)
        {
            services.AddScoped<IGitHubAuthenticationAccessor, GitHubAuthenticationAccessor>();
        }
    }
}
