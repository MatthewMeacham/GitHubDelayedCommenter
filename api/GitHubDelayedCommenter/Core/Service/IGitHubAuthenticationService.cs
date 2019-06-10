using Core.Models;
using System.Threading.Tasks;

namespace Core.Service
{
    public interface IGitHubAuthenticationService
    {
        Task<GitHubAuthenticationResponse> AuthenticateWithCode(string code);
    }
}
