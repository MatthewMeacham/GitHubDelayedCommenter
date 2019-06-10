using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Service;

namespace Web
{
    public static class DependencyRegistrar
    {
        public static void RegisterWebDependencies(this IServiceCollection services)
        {
            services.RegisterServiceDependencies();
        }
    }
}
