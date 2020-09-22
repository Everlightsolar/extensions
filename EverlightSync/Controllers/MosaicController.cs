using EverlightSync.BusinessLogic;
using EverlightSync.MosaicModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Action = EverlightSync.EverlightModels.Action;

namespace EverlightSync.Controllers
{
    public class MosaicController : ApiController
    {
        [HttpPost]
        public async Task<IHttpActionResult> EverlightAction([FromBody] Action action)
        {
            switch (action.action)
            {
                case "create":
                    Logger.Log($"Create opportunity {action.opportunityId}");
                    await Mosaic.CreateOpportunity(action.opportunityId);
                    break;
                case "sendCreditApp":
                    Logger.Log($"sendCreditApp {action.opportunityId}");
                    await Mosaic.SendCreditApplication(action.opportunityId);
                    break;
                case "sendLoanApp":
                    Logger.Log($"sendLoanApp {action.opportunityId}");
                    await Mosaic.SendLoanApplication(action.opportunityId);
                    break;
                case "pAndI":
                    Logger.Log($"pAndI {action.opportunityId}");
                    await Mosaic.HomeImprovementAgreement(action);
                    break;
                case "installationScheduled":
                    Logger.Log($"installationScheduled {action.opportunityId}");
                    await Mosaic.InstallationScheduled(action.opportunityId);
                    break;
                case "installationComplete":
                    Logger.Log($"installationComplete {action.opportunityId}");
                    await Mosaic.InstallationComplete(action.opportunityId);
                    break;
                case "finalInspection":
                    Logger.Log($"finalInspection {action.opportunityId}");
                    await Mosaic.FinalInspection(action);
                    break;
                case "permissionToOperate":
                    Logger.Log($"permissionToOperate {action.opportunityId}");
                    await Mosaic.PermissionToOperate(action);
                    break;
                case "finalCompletion":
                    Logger.Log($"finalCompletion {action.opportunityId}");
                    await Mosaic.FinalCompletion(action.opportunityId);
                    break;
            }
            return Ok();
        }

        [HttpPost]
        public async Task<IHttpActionResult> OpportunityStatusEvent([FromBody] OpportunityStatusEvent oppEvent)
        {
            Logger.Log($"OpportunityStatusEvent: {JsonConvert.SerializeObject(oppEvent)}");
            var status = oppEvent.Status;
            switch (status)
            {
                case OpportunityStatus.CreditAppApproved:
                case OpportunityStatus.CreditAppDenied:
                    await Mosaic.UpdateCreditDecision(oppEvent);
                    break;
                case OpportunityStatus.LoanAppCountersigned:
                    await Mosaic.PerfectPacket(oppEvent);
                    break;
                case OpportunityStatus.WelcomeCall:
                    await Mosaic.WelcomeCallComplete(oppEvent);
                    break;
                default:
                    await Mosaic.UpdateOpportunity(oppEvent);
                    break;
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IHttpActionResult> DemoOpportunityStatusEvent([FromBody] OpportunityStatusEvent oppEvent)
        {
            Logger.Log($"Demo OpportunityStatusEvent: {JsonConvert.SerializeObject(oppEvent)}");
            var status = oppEvent.Status;
            await Task.Delay(1000);

            var client = new HttpClient() { BaseAddress = new Uri("http://24.11.88.70:8001/everlightsync/api/") };
            var response = await client.PostAsJsonAsync("mosaic/OpportunityStatusEvent", oppEvent);
            var json = await response.Content.ReadAsStringAsync();
            

            //switch (status)
            //{
            //    case OpportunityStatus.CreditAppApproved:
            //    case OpportunityStatus.CreditAppDenied:
            //        await Mosaic.UpdateCreditDecision(oppEvent);
            //        break;
            //    case OpportunityStatus.LoanAppCountersigned:
            //        await Mosaic.PerfectPacket(oppEvent);
            //        break;
            //}

            return Ok();
        }

        [HttpGet]
        public List<int> NeedWelcomeCallCheck()
        {
            return Mosaic.GetWelcomeCallCheck();
        }

        // GET api/<controller>
        public async Task <IEnumerable<string>> Get()
        {
            throw new Exception("new");
            //await Salesforce.DoToken();
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IHttpActionResult> DoSomething([FromBody] string value)
        {
            await Mosaic.UpdateStatuses();
            return Ok();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}