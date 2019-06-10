using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Core.Models
{
    public class GitHubAuthenticationResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("scope")]
        public string Scope { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }
    }
}
