using EverlightSync.EverlightModels;
using EverlightSync.MosaicModels;
using EverlightSync.Properties;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Action = EverlightSync.EverlightModels.Action;
using System.Web;
using System.IO;
using RestSharp;

namespace EverlightSync.BusinessLogic
{
    public class Mosaic
    {
        private static string _token;
        public static string Token
        {
            get
            {
                if (!string.IsNullOrWhiteSpace(_token))
                    return _token;

                using (var db = new EverlightDbEntities())
                    _token = db.Tokens.FirstOrDefault().Tony;

                return _token;
            }
            set => _token = null;
        }

        private static Lazy<HttpClient> _mosaicClient => new Lazy<HttpClient>(() =>
        {
            var client = new HttpClient() { BaseAddress = new Uri(Settings.MosaicUrl) };
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Settings.Mosaic);
            return client;
        });

        private static Lazy<HttpClient> _salesforceClient => new Lazy<HttpClient>(() =>
        {
            var client = new HttpClient() { BaseAddress = new Uri(Settings.Url) };
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
            return client;
        });

        public static async Task HomeImprovementAgreement(Action action)
        {
            var doc = await GetDoc(action);
            var mosaicId = GetMosaicId(action.opportunityId);

            var client = new RestClient($"{Settings.MosaicUrl}opportunities/{mosaicId}/documents/INSTALLER_AGREEMENT");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Authorization", $"Bearer {Settings.Mosaic}");
            request.AddFile("", doc, $"{action.docTitle}.pdf");
            IRestResponse response = client.Execute(request);
            Logger.Log($"INSTALLER_AGREEMENT {response.StatusCode} {response.Content}");

            var submit = false;
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                using(var db = new EverlightDbEntities())
                {
                    var opp = db.Opportunities.FirstOrDefault(x => x.MosaicId == mosaicId);
                    opp.InstallerAgreement = true;
                    submit = opp.InstallerAgreement && opp.WelcomeCall;
                    db.SaveChanges();
                }
            }

            if (!submit)
                return;

            var agreementResponse = await _mosaicClient.Value.PostAsync($"opportunities/{mosaicId}/submit-for-review", null);
            Logger.Log($"SUBMIT FOR REVIEW {agreementResponse.StatusCode} {await agreementResponse.Content.ReadAsStringAsync()}");
        }

        public static async Task FinalInspection(Action action)
        {
            var doc = await GetDoc(action);
            var mosaicId = GetMosaicId(action.opportunityId);

            var client = new RestClient($"{Settings.MosaicUrl}opportunities/{mosaicId}/documents/FINAL_PERMIT");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Authorization", $"Bearer {Settings.Mosaic}");
            request.AddFile("", doc, $"{action.docTitle}.pdf");
            //request.AddFileBytes("name", doc, $"{action.docTitle}.pdf");
            IRestResponse response = client.Execute(request);
            Logger.Log($"FINAL_PERMIT {response.StatusCode} {response.Content}");
        }

        public static async Task PermissionToOperate(Action action)
        {
            var doc = await GetDoc(action);
            var mosaicId = GetMosaicId(action.opportunityId);

            var client = new RestClient($"{Settings.MosaicUrl}opportunities/{mosaicId}/documents/PERMISSION_TO_OPERATE");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Authorization", $"Bearer {Settings.Mosaic}");
            request.AddFile("", doc, $"{action.docTitle}.pdf");
            //request.AddFileBytes("name", doc, $"{action.docTitle}.pdf");
            IRestResponse response = client.Execute(request);
            Logger.Log($"PERMISSION_TO_OPERATE {response.StatusCode} {response.Content}");
        }

        public static async Task FinalCompletion(string oppId)
        {
            var mosaicOppId = GetMosaicId(oppId);
            var response = await _mosaicClient.Value.PostAsync($"opportunities/{mosaicOppId}/submit-for-final", null);
            var json = await response.Content.ReadAsStringAsync();
            Logger.Log($"FinalCompletion: {response.StatusCode} {json}");
        }

        public static async Task MosaicOppTransition(int mosaicOppId, string status)
        {
            dynamic createJson = new JObject();
            createJson.status = status;
            var content = new StringContent(createJson.ToString(), Encoding.UTF8, "application/json");
            var response = await _mosaicClient.Value.PatchAsync($"opportunity/{mosaicOppId}", content);
            var contentJson = await response.Content.ReadAsStringAsync();
            Logger.Log($"OppTransition: {response.StatusCode} {contentJson}");
        }

        private static async Task<byte[]> GetDoc(Action action)
        {
            var response = await SalesforceApi.SafeRunForm(() => _salesforceClient.Value.GetAsync($"services/data/v27.0/sobjects/ContentVersion/{action.docId}/VersionData"), _salesforceClient.Value);
            return response;
        }

        public static async Task InstallationScheduled(string oppId)
        {
            //TODO: I think
            var mosaicId = GetMosaicId(oppId);
            await MosaicOppTransition(mosaicId, "Bill of lading approved");
        }

        public static async Task InstallationComplete(string oppId)
        {
            var mosaicId = GetMosaicId(oppId);
            await MosaicOppTransition(mosaicId, "Installation complete");
        }

        public static async Task PerfectPacket(OpportunityStatusEvent statusEvent)
        {
            var oppId = UpdateOppDb(statusEvent);
            //run some validation before this step
            dynamic validationOpp = await Salesforce.GetOpportunity(oppId, new List<string> { "Site_Analysis_Completion_Date__c" });
            if (validationOpp.Site_Analysis_Completion_Date__c == null)
            {
                dynamic opp = new JObject();
                opp.Mosaic_Status__c = statusEvent.statusDescription;
                await Salesforce.UpdateOpportunity(opp, oppId);
            }
            else
            {
                dynamic opp = new JObject();
                opp.Mosaic_Status__c = statusEvent.statusDescription;
                opp.StageName = "Perfect Packet";
                await Salesforce.UpdateOpportunity(opp, oppId);
            }
        }

        public static async Task WelcomeCallComplete(OpportunityStatusEvent statusEvent)
        {
            string oppId;
            var submit = false;
            //update welcome call flag
            using (var db = new EverlightDbEntities())
            {
                var oppEntity = db.Opportunities.FirstOrDefault(x => x.MosaicId == statusEvent.id);
                oppId = oppEntity.OpportunityId;
                oppEntity.WelcomeCall = true;
                submit = oppEntity.InstallerAgreement && oppEntity.WelcomeCall;
                db.SaveChanges();
            }

            dynamic opp = new JObject();
            opp.Mosaic_Welcome_Call_Complete__c = DateTime.Now.Date.ToString("yyyy-MM-dd");
            await Salesforce.UpdateOpportunity(opp, oppId);

            if (!submit)
                return;

            var agreementResponse = await _mosaicClient.Value.PostAsync($"opportunities/{statusEvent.id}/submit-for-review", null);
            Logger.Log($"SUBMIT FOR REVIEW {agreementResponse.StatusCode} {await agreementResponse.Content.ReadAsStringAsync()}");
        }

        public static List<int> GetWelcomeCallCheck()
        {
            using (var db = new EverlightDbEntities())
            {
                return db.Opportunities.Where(x => !x.WelcomeCall && (x.StatusId == 7 || x.StatusId == 8 || x.StatusId == 9)).Select(x => x.MosaicId.Value).ToList();
            }
        }

        public static async Task UpdateCreditDecision(OpportunityStatusEvent statusEvent)
        {
            var mosaicOpp = await MosaicApi.GetOpportunity(statusEvent.id);
            var oppId = UpdateOppDb(statusEvent);
            dynamic opp = new JObject();
            opp.Mosaic_Credit_Decision__c = mosaicOpp.creditDecision.decision;
            opp.Mosaic_Status__c = $"{mosaicOpp.status}, waiting on {mosaicOpp.waitingOn?.ToLower()}";
            await Salesforce.UpdateOpportunity(opp, oppId);
        }

        public static async Task UpdateOpportunity(OpportunityStatusEvent statusEvent)
        {
            var oppId = UpdateOppDb(statusEvent);
            dynamic opp = new JObject();
            opp.Mosaic_Status__c = statusEvent.statusDescription;
            await Salesforce.UpdateOpportunity(opp, oppId);
        }

        private static string UpdateOppDb(OpportunityStatusEvent statusEvent)
        {
            string oppId;
            using (var db = new EverlightDbEntities())
            {
                var oppEntity = db.Opportunities.FirstOrDefault(x => x.MosaicId == statusEvent.id);
                oppId = oppEntity.OpportunityId;
                oppEntity.StatusId = statusEvent.statusId;
                oppEntity.StatusDescription = statusEvent.statusDescription;
                db.SaveChanges();
            }
            return oppId;
        }

        private static void UpdateOppDb(MosaicOpportunity mosaicOpportunity)
        {
            using (var db = new EverlightDbEntities())
            {
                var oppEntity = db.Opportunities.FirstOrDefault(x => x.MosaicId == mosaicOpportunity.id);
                oppEntity.StatusId = (int)GetStatus(mosaicOpportunity.status);
                oppEntity.StatusDescription = mosaicOpportunity.status;
                db.SaveChanges();
            }
        }

        public static List<OpportunityAssociation> GetOpportunities()
        {
            using (var db = new EverlightDbEntities())
            {
                return db.Opportunities.Where(x => x.StatusId.Value < 33).Select(x => new OpportunityAssociation { MosaicOppId = x.MosaicId.Value, StatusId = x.StatusId.Value, OppId = x.OpportunityId }).ToList();
            }
        }

        public static async Task UpdateStatuses()
        {
            var opps = GetOpportunities();
            foreach (var opp in opps)
            {
                var mosaicOpp = await MosaicApi.GetOpportunity(opp.MosaicOppId);
                var newStatus = GetStatus(mosaicOpp.status);
                if ((int)newStatus > opp.StatusId)
                {
                    var status = new OpportunityStatusEvent { id = mosaicOpp.id, statusId = (int)newStatus, statusDescription = mosaicOpp.status };
                    switch (newStatus)
                    {
                        case OpportunityStatus.CreditAppApproved:
                        case OpportunityStatus.CreditAppDenied:
                            await UpdateCreditDecision(status);
                            break;
                        //case OpportunityStatus.LoanAppCountersigned:
                        //    await PerfectPacket(status);
                        //    break;
                        default:
                            await UpdateOpportunity(status);
                            break;
                    }
                }
            }
        }

        public static async Task CreateOpportunity(string opportunityId)
        {
            var mosaicOpp = await BuildMosaicOpportunity(opportunityId);
            var mosaicJson = JsonConvert.SerializeObject(mosaicOpp);

            var createMessage = new HttpRequestMessage(HttpMethod.Post, "opportunities")
            {
                Content = new StringContent(JsonConvert.SerializeObject(mosaicOpp), Encoding.UTF8, "application/json")
            };
            var response = await _mosaicClient.Value.SendAsync(createMessage);
            var responseJson = await response.Content.ReadAsStringAsync();
            Logger.Log($"try create mosaicopp {mosaicJson} {response.StatusCode} {responseJson}");

            //update mosaicId on success
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var newMosaicOpp = JsonConvert.DeserializeObject<MosaicOpportunity>(responseJson);
                SaveNewMosaicOpportunity(newMosaicOpp.id, opportunityId);

                dynamic opp = new JObject();
                opp.Mosaic_Id__c = newMosaicOpp.id;
                opp.Mosaic_Credit_Application__c = newMosaicOpp.creditApplicationUrl;
                opp.Mosaic_Status__c = "New, Waiting for Installer";

                await Salesforce.UpdateOpportunity(opp, opportunityId);
            }
            else
            {
                dynamic opp = new JObject();
                opp.Mosaic_Status__c = $"Error Creating Opp: {responseJson}";

                await Salesforce.UpdateOpportunity(opp, opportunityId);
            }
        }

        public static int GetMosaicId(string opportunityId)
        {
            int? mosaicId;
            using (var db = new EverlightDbEntities())
            {
                mosaicId = db.Opportunities.FirstOrDefault(x => x.OpportunityId == opportunityId && x.StatusId != 99).MosaicId;
            }
            return mosaicId.Value;
        }

        public static async Task SendCreditApplication(string opportunityId)
        {
            var mosaicId = GetMosaicId(opportunityId);
            var response = await _mosaicClient.Value.PostAsync($"opportunities/{mosaicId}/send-credit-application", null);

            if (response.IsSuccessStatusCode)
                await UpdateOpportunityStatus(opportunityId);
        }

        public static async Task SendLoanApplication(string opportunityId)
        {
            var mosaicId = GetMosaicId(opportunityId);
            var response = await _mosaicClient.Value.PostAsync($"opportunities/{mosaicId}/send-loan-agreement", null);
            Logger.Log("Send Loan App:" + await response.Content.ReadAsStringAsync());
        }

        private static async Task UpdateOpportunityStatus(string oppId)
        {
            var mosaicId = GetMosaicId(oppId);
            var mosaicOpp = await MosaicApi.GetOpportunity(mosaicId);
            UpdateOppDb(mosaicOpp);

            dynamic opp = new JObject();
            opp.Mosaic_Status__c = $"{mosaicOpp.status}, waiting on {mosaicOpp.waitingOn?.ToLower()}";
            await Salesforce.UpdateOpportunity(opp, oppId);
        }

        private static void SaveNewMosaicOpportunity(int mosaicId, string opportunityId)
        {
            using (var db = new EverlightDbEntities())
            {
                var item = new Opportunity() { MosaicId = mosaicId, OpportunityId = opportunityId, StatusId = 1, StatusDescription = "New" };
                db.Opportunities.Add(item);
                db.SaveChanges();
            }
        }

        public static async Task<string> GetCreditAppUrl(int id)
        {
            var response = await _mosaicClient.Value.GetAsync($"opportunities/{id}/on-screen-credit-app-url");
            if (response.IsSuccessStatusCode)
            {
                dynamic obj = JObject.Parse(await response.Content.ReadAsStringAsync());
                return obj.onscreenCreditAppUrl;
            }
            else
                return null;
        }

        private static async Task<MosaicOpportunity> BuildMosaicOpportunity(string opportunityId)
        {
            var qs = "SELECT Name," +
                "Id," +
                "Project_Address__c," +
                "Project_City__c," +
                "Project_State__c," +
                "Project_Zip_Code__c," +
                "Total_Sale_Price__c," +
                "Pre_solar_Monthly_Payment__c," +
                "Estimated_Offset__c," +
                "X1st_Year_Estimated_Production__c," +
                "System_Size__c," +
                "Initial_Appt_Date__c," +
                "Panel_Name__c," +
                "Inverter_Name__c," +
                "Energy_Consultant__c," +
                "(select " +
                "Contact.FirstName," +
                "Contact.LastName," +
                "Contact.Phone," +
                "Contact.Email " +
                "FROM Opportunity.OpportunityContactRoles " +
                "WHERE OpportunityContactRole.IsPrimary = TRUE LIMIT 1) " +
                "FROM Opportunity " +
                $"WHERE Id = '{opportunityId}' LIMIT 1";


            var oppResponse = await SalesforceApi.SafeRun(() =>
            {
                var message = new HttpRequestMessage(HttpMethod.Get, $"services/data/v27.0/query?q={HttpUtility.UrlEncode(qs, Encoding.UTF8)}");
                return _salesforceClient.Value.SendAsync(message);
            }, _salesforceClient.Value);
            var oppJson = await oppResponse.Content.ReadAsStringAsync();
            dynamic opportunity = JObject.Parse(oppJson);
            opportunity = opportunity.records[0];
            var primaryContact = opportunity.OpportunityContactRoles.records[0];

            //now get EC
            var ecQuery = $"select Email from User where Name = '{opportunity.Energy_Consultant__c}' LIMIT 1";
            var ecResponse = await SalesforceApi.SafeRun(() =>
            {
                var message = new HttpRequestMessage(HttpMethod.Get, $"services/data/v27.0/query?q={HttpUtility.UrlEncode(ecQuery, Encoding.UTF8)}");
                return _salesforceClient.Value.SendAsync(message);
            }, _salesforceClient.Value);
            var json = await ecResponse.Content.ReadAsStringAsync();
            dynamic email = JObject.Parse(json);

            //build object
            decimal systemSizeKW = decimal.Parse(((string)opportunity.System_Size__c).Replace(" kW", ""));
            MosaicOpportunity mOpp = new MosaicOpportunity
            {
                externalId = opportunity.Id,
                firstName = primaryContact.Contact.FirstName,
                lastName = primaryContact.Contact.LastName,
                phone = new Regex("[^0-9]").Replace(primaryContact.Contact.Phone.ToString(), ""),
                email = primaryContact.Contact.Email,
                salesRepEmail = email.records[0].Email
            };

#if DEBUG
            mOpp.salesRepEmail = "aaron.godwin@everlightsolar.com";
#endif

            MosaicAddress address = new MosaicAddress
            {
                street = opportunity.Project_Address__c,
                city = opportunity.Project_City__c,
                state = opportunity.Project_State__c,
                zip = opportunity.Project_Zip_Code__c
            };

            MosaicSolarSystem solarSystem = new MosaicSolarSystem
            {
                monthlyBillBeforeSolar = Math.Round(decimal.Parse(opportunity.Pre_solar_Monthly_Payment__c.ToString()), 2),
                monthlyBillAfterSolar = ((100 - decimal.Parse(opportunity.Estimated_Offset__c.ToString())) / 100) * decimal.Parse(opportunity.Pre_solar_Monthly_Payment__c.ToString()),
                estAnnualProduction = (int)opportunity.X1st_Year_Estimated_Production__c,
                dcSystemSizeKw = Math.Round(systemSizeKW, 4),
                pvModules = GetPanelName(opportunity), //opportunity.Panel_Name__c,
                pvInverter = "APSystems YC600", //opportunity.Inverter_Name__c,
                cost = Math.Round(decimal.Parse(opportunity.Total_Sale_Price__c.ToString()), 2),
                totalSystemPrice = Math.Round(decimal.Parse(opportunity.Total_Sale_Price__c.ToString()), 2),
                installerAgreementDate = DateTime.Now.ToString("yyyy-MM-dd"),
                estInstallDate = DateTime.Now.AddDays(90).ToString("yyyy-MM-dd"),
                omProvider = "NONE"
            };
            // solarSystem.loanProductName = 'Customer has not yet passed credit.';

            mOpp.address = address;
            mOpp.solarSystem = solarSystem;

            return mOpp;
        }

        private static string GetPanelName(dynamic opp)
        {
#if DEBUG
            return "S-Energy SN310M";
#endif
            string panel = opp.Panel_Name__c;
            if (panel.Contains("310"))
                return "S-Energy SN310M All Black";
            else if (panel.Contains("Eagle") || panel.Contains("60 M"))
                return "Jinko Solar Eagle 60HM G2 (JKM320M-60HBL)";
            else if (panel.Contains("SIL"))
                return "Silfab Silfab 320W";
            return "";
        }

        public static OpportunityStatus GetStatus(string status)
        {
            if (status.Equals("New", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.New;
            if (status.Equals("Credit app sent", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.CreditAppSent;
            if (status.Equals("Credit app completed", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.CreditAppCompleted;
            if (status.Equals("Credit app approved", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.CreditAppApproved;
            if (status.Equals("Credit app denied", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.CreditAppDenied;
            if (status.Equals("Loan app sent", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.LoanAppSent;
            if (status.Equals("Loan app submitted", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.LoanAppSubmitted;
            if (status.Equals("Loan app approved", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.LoanAppApproved;
            if (status.Equals("Loan app signed", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.LoanAppSigned;
            if (status.Equals("Loan app countersigned", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.LoanAppCountersigned;
            if (status.Equals("Bill of lading submitted", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.BillOfLadingSubmitted;
            if (status.Equals("Bill of lading approved", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.BillOfLadingApproved;
            if (status.Equals("Installation complete", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.InstallationComplete;
            if (status.Equals("Installation confirmed", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.InstallationConfirmed;
            if (status.Equals("Inspection complete", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.InspectionComplete;
            if (status.Equals("Final confirmation", StringComparison.CurrentCultureIgnoreCase))
                return OpportunityStatus.FinalConfirmation;

            return OpportunityStatus.Closed;
        }
    }
}