using EverlightSync.EverlightModels;
using EverlightSync.Properties;
using Jose;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace EverlightSync.BusinessLogic
{
    public class Salesforce
    {
        private static Lazy<HttpClient> _salesforceClient => new Lazy<HttpClient>(() =>
        {
            var client = new HttpClient() { BaseAddress = new Uri(Settings.Url) };
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Mosaic.Token);
            return client;
        });

        public static async Task<JObject> GetOpportunity(string opportunityId, List<string> fields)
        {
            var fieldQuery = string.Join(",", fields);
            var response = await SalesforceApi.SafeRun(() => {
                return _salesforceClient.Value.GetAsync($"services/data/v27.0/sobjects/Opportunity/{opportunityId}?{fieldQuery}");
            }, _salesforceClient.Value);
            var json = await response.Content.ReadAsStringAsync();
            return JObject.Parse(json);
        }

        public static async Task UpdateOpportunity(dynamic opp, string opportunityId)
        {
            var response = await SalesforceApi.SafeRun(() => {
                var content = new StringContent(opp.ToString(), Encoding.UTF8, "application/json");
                return _salesforceClient.Value.PatchAsync($"services/data/v27.0/sobjects/Opportunity/{opportunityId}", content);
            }, _salesforceClient.Value);
            if(!response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                Logger.Log($"Error Updating Opportunity {opportunityId}: {response.StatusCode} {json}");
            }
        }

        public static async Task DoToken()
        {
            string ck;
            using (var db = new EverlightDbEntities())
            {
                var token = db.Tokens.FirstOrDefault();
                ck = token.CorralSound;
                var cert = token.PonyKorn;
                string jwt;
                RsaPrivateCrtKeyParameters keyPair;
                //https://gist.github.com/booleangate/30d345ecf0617db0ea19c54c7a44d06f
                /// cert begins -----BEGIN PRIVATE KEY----- and ends with -END PRIVATE KEY-----";

                using (var sr = new StringReader(cert))
                {
                    PemReader pr = new PemReader(sr);
                    keyPair = (RsaPrivateCrtKeyParameters)pr.ReadObject();
                }

                RSAParameters rsaParams = DotNetUtilities.ToRSAParameters(keyPair);
                var payload = new Dictionary<string, object>()
                {
                    { "iss", ck },
                    { "exp", DateTimeOffset.Now.ToUnixTimeSeconds() + 180 },
                    { "aud", Settings.Login }, //TODO config test & login
                    { "sub", Settings.Email },
                };
                using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())
                {
                    rsa.ImportParameters(rsaParams);
                    jwt = JWT.Encode(payload, rsa, JwsAlgorithm.RS256);
                }

                var client = new HttpClient
                {
                    BaseAddress = new Uri(Settings.Url)
                };
                var createMessage = new HttpRequestMessage(HttpMethod.Post, "services/oauth2/token");
                var dict = new Dictionary<string, string>();
                dict.Add("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
                dict.Add("assertion", jwt);
                createMessage.Content = new FormUrlEncodedContent(dict);

                var response = await client.SendAsync(createMessage);
                var json = await response.Content.ReadAsStringAsync();
                dynamic obj = JObject.Parse(json);
                token.Tony = obj.access_token;
                Mosaic.Token = null;
                db.SaveChanges();
                //Logger.Log(jwt);
                Logger.Log("token stuff " + response.StatusCode + json);
            }
        }
    }
}