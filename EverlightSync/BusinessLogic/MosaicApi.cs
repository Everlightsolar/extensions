using EverlightSync.MosaicModels;
using EverlightSync.Properties;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;

namespace EverlightSync.BusinessLogic
{
    public static class MosaicApi
    {
        private static Lazy<HttpClient> _mosaicClient => new Lazy<HttpClient>(() =>
        {
            var client = new HttpClient() { BaseAddress = new Uri(Settings.MosaicUrl) };
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Settings.Mosaic);
            return client;
        });

        public static async Task<MosaicOpportunity>GetOpportunity(int id)
        {
            var response = await _mosaicClient.Value.GetAsync($"opportunities/{id}");
            return JsonConvert.DeserializeObject<MosaicOpportunity>(await response.Content.ReadAsStringAsync());
        }
    }
}