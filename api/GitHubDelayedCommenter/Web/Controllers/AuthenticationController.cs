using Core.Models;
using Core.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Utility;
using Web.Models.Request;

namespace Web.Controllers
{
    [Route("api/authenticate")]
    public class AuthenticationController : Controller
    {

        private readonly IGitHubAuthenticationService _gitHubAuthenticationService;

        public AuthenticationController(IGitHubAuthenticationService gitHubAuthenticationService)
        {
            _gitHubAuthenticationService = gitHubAuthenticationService;
        }

        // GET: api/authenticate/github
        [Route("github")]
        [HttpPost]
        public async Task<GitHubAuthenticationResponse> AuthenticateWithGitHubCode([FromBody] GitHubAuthenticationRequest request)
        {
            Guard.IsNotNull(request, nameof(request));
            Guard.IsNotNullOrWhitespace(request.Code, nameof(request.Code));

            return await _gitHubAuthenticationService.AuthenticateWithCode(request.Code);
        }
    }
}
