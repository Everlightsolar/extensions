using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;

namespace EverlightSync.BusinessLogic
{
    public class SalesforceApi
    {
        public async static Task<HttpResponseMessage> SafeRun(Func<Task<HttpResponseMessage>> func, HttpClient client)
        {
            var response = await func();

            if (response.StatusCode != System.Net.HttpStatusCode.Unauthorized)
                return response;

            await Salesforce.DoToken();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Mosaic.Token);
            return await func();
            //return await response.Content.ReadAsStringAsync();
        }

        public async static Task<byte[]> SafeRunForm(Func<Task<HttpResponseMessage>> func, HttpClient client)
        {
            var response = await func();

            if (response.StatusCode != System.Net.HttpStatusCode.Unauthorized)
                return await response.Content.ReadAsByteArrayAsync();

            await Salesforce.DoToken();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Mosaic.Token);
            response = await func();
            return await response.Content.ReadAsByteArrayAsync();
        }
    }
}