using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Core.DataAccess;
using Core.Models;
using Newtonsoft.Json;
using System.Configuration;
using System.Net;
using Core.Configuration;
using Microsoft.Extensions.Options;

namespace DataAccess
{
    public class GitHubAuthenticationAccessor : IGitHubAuthenticationAccessor
    {
        // ReSharper disable once InconsistentNaming
        private static readonly HttpClient _httpClient = new HttpClient();

        private readonly IOptions<GitHubSettings> _gitHubConfiguration;

        public GitHubAuthenticationAccessor(IOptions<GitHubSettings> gitHubConfiguration)
        {
            _gitHubConfiguration = gitHubConfiguration;
        }

        public async Task<GitHubAuthenticationResponse> AuthenticateWithCode(string code)
        {
            var values = new Dictionary<string, string>
            {
                { "client_id", _gitHubConfiguration.Value.ClientId },
                { "client_secret", _gitHubConfiguration.Value.ClientSecret },
                { "code", code }
            };

            using (var requestMessage = new HttpRequestMessage(HttpMethod.Post, "https://github.com/login/oauth/access_token"))
            {
                requestMessage.Headers.Add("Accept", "application/json");
                requestMessage.Content = new FormUrlEncodedContent(values);

                var response = await _httpClient.SendAsync(requestMessage);
                var responseString = await response.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<GitHubAuthenticationResponse>(responseString);
            }
        }
    }
}
