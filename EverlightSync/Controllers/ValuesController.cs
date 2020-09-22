using EverlightSync.BusinessLogic;
using System.Threading.Tasks;
using System.Web.Http;

namespace EverlightSync.Controllers
{
    public class ValuesController : ApiController
    {
        // POST api/values
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] string value)
        {
            await Salesforce.DoToken();
            //await Mosaic.GetCreditAppUrl(146873);
            return Ok();
        }
    }
}
