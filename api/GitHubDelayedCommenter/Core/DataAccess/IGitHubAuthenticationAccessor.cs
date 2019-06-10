using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Core.DataAccess
{
    public interface IGitHubAuthenticationAccessor
    {
        Task<GitHubAuthenticationResponse> AuthenticateWithCode(string code);
    }
}
