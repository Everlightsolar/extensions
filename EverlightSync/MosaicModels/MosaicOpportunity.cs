using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EverlightSync.MosaicModels
{
    public class MosaicOpportunity
    {
        public int id { get; set; }
        public string externalId { get; set; }
        public string status { get; set; }
        public string waitingOn { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string creditApplicationUrl { get; set; }
        public MosaicAddress address { get; set; }
        public MosaicSolarSystem solarSystem { get; set; }
        public string salesRepEmail { get; set; }
        public CreditDecision creditDecision { get; set; }
    }

    public class CreditDecision
    {
        public string decision { get; set; }
        public List<string> borrowerMessaging { get; set; }
        public string decisionDate { get; set; }
        public string expirationDate { get; set; }
    }

    public class OpportunityStatusEvent
    {
        public int id { get; set; }
        public int statusId { get; set; }
        public string statusDescription { get; set; }
        public OpportunityStatus Status => (OpportunityStatus) statusId;
    }

    public class OpportunityAssociation
    {
        public string OppId { get; set; }
        public int MosaicOppId { get; set; }
        public int StatusId { get; set; }
    }

    public enum OpportunityStatus
    {
        New = 1,
//        1: New
          //Waiting for: Installer
        CreditAppSent = 2,
        //2: Credit app sent
        //Waiting for: Customer
        CreditAppCompleted = 3,
        //3: Credit app completed
        //Waiting for: Mosaic
        CreditAppApproved = 4,
        //4: Credit app approved
        //Waiting for: Installer
        CreditAppDenied = 5,
        //5: Credit app denied
        //Waiting for: n/a
        LoanAppSent = 6,
        //6: Loan app sent
        //Waiting for: Customer
        LoanAppSubmitted = 7,
        //7: Loan app submitted
        //Waiting for: Mosaic
        LoanAppApproved = 8,
        //8: Loan app approved
        //Waiting for: Mosaic
        LoanAppSigned = 9,
        //9: Loan app signed
        //Waiting for: Installer
        LoanAppCountersigned = 10,
        //10: Loan app countersigned
        //Waiting for: Installer
        BillOfLadingSubmitted = 15,
        //15: Bill of lading submitted
        //Waiting for: Mosaic
        BillOfLadingApproved = 16,
        //16: Bill of lading approved:
        //Waiting for: Installer
        InstallationComplete = 21,
        //21: Installation complete
        //Waiting for: Customer
        InstallationConfirmed = 22,
        //22: Installation confirmed
        //Waiting for: Installer
        InspectionComplete = 31,
        //31: Inspection complete
        //Waiting for: Mosaic
        FinalConfirmation = 32,
        //32: Final confirmation
        //Waiting for: n/a
        FinalPaymentMade = 33,
        //33: Final payment made
        //Waiting for: n/a
        Closed = 99,
        //99: Closed
        //Waiting for: n/a
        WelcomeCall = 98
    }

    public class MosaicSolarSystem
    {
        public decimal monthlyBillBeforeSolar { get; set; }
        public decimal monthlyBillAfterSolar { get; set; }
        public int estAnnualProduction { get; set; }
        public decimal dcSystemSizeKw { get; set; }
        public string pvModules { get; set; }
        public string pvInverter { get; set; }
        public decimal cost { get; set; }
        public decimal totalSystemPrice { get; set; }
        public string estInstallDate { get; set; }
        public string installerAgreementId { get; set; }
        public string installerAgreementDate { get; set; }
        public string omProvider { get; set; }
        public string loanProductName { get; set; }
    }

    public class MosaicAddress
    {
        public string street { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
    }
}