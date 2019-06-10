using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models.Request
{
    public class GitHubAuthenticationRequest
    {
        public string Code { get; set; }
    }
}
