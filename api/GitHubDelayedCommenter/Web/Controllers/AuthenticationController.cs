using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/authenticate")]
    public class AuthenticationController : Controller
    {
        // GET: api/authenticate/github?code={code}
        [Route("github")]
        [HttpGet]
        public dynamic AuthenticateWithGitHubCode([FromQuery] string code)
        {
            return new {
                token = "test",
                code
            };
        }
    }
}
