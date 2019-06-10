using Core.DataAccess;
using Core.Models;
using Core.Service;
using System.Threading.Tasks;

namespace Service
{
    public class GitHubAuthenticationService : IGitHubAuthenticationService
    {

        private readonly IGitHubAuthenticationAccessor _gitHubAuthenticationAccessor;

        public GitHubAuthenticationService(IGitHubAuthenticationAccessor gitHubAuthenticationAccessor)
        {
            _gitHubAuthenticationAccessor = gitHubAuthenticationAccessor;
        }

        public Task<GitHubAuthenticationResponse> AuthenticateWithCode(string code)
        {
            return _gitHubAuthenticationAccessor.AuthenticateWithCode(code);
        }
    }
}
