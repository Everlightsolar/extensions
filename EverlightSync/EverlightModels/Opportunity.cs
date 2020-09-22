using System;
using System.Collections.Generic;

namespace EverlightSync.EverlightModels
{
    public class Opportunity
    {
        public int Mosaic_Id__c { get; set; }
        public string Mosaic_Status__c { get; set; }
        public string Mosaic_Credit_Application__c { get; set; }
        public string Mosaic_Credit_Decision__c { get; set; }
        public string Id{ get; set; }
        public bool IsDeleted { get; set; }
        public string AccountId{ get; set; }
        public string RecordTypeId{ get; set; }
        public bool IsPrivate{ get; set; }
        public string Name{ get; set; }
        public string Description{ get; set; }
        public string StageName{ get; set; }
        public Decimal Amount{ get; set; }
        public Double Probability{ get; set; }
        public Decimal ExpectedRevenue{ get; set; }
        public Double TotalOpportunityQuantity{ get; set; }
        public DateTime CloseDateTime{ get; set; }
        public string Type{ get; set; }
        public string NextStep{ get; set; }
        public string LeadSource{ get; set; }
        public bool IsClosed{ get; set; }
        public bool IsWon{ get; set; }
        public string ForecastCategory{ get; set; }
        public string ForecastCategoryName{ get; set; }
        public string CampaignId{ get; set; }
        public bool HasOpportunityLineItem{ get; set; }
        public string Pricebook2Id{ get; set; }
        public string OwnerId{ get; set; }
        public DateTime CreatedDateTime{ get; set; }
        public string CreatedById{ get; set; }
        public DateTime LastModifiedDateTime{ get; set; }
        public string LastModifiedById{ get; set; }
        public DateTime SystemModstamp{ get; set; }
        public DateTime LastActivityDateTime{ get; set; }
        public int FiscalYear{ get; set; }
        public string Fiscal{ get; set; }
        public string ContactId{ get; set; }
        public DateTime LastViewedDateTime{ get; set; }
        public DateTime LastReferencedDateTime{ get; set; }
        public string SyncedQuoteId{ get; set; }
        public string ContractId{ get; set; }
        public bool HasOpenActivity{ get; set; }
        public bool HasOverdueTask{ get; set; }
        public bool Budget_Confirmed__c{ get; set; }
        public bool Discovery_Completed__c{ get; set; }
        public bool ROI_Analysis_Completed__c{ get; set; }
        /* Provide additional details as to why this opportunity was lost.
        */
        public string Lost_Explanation__c{ get; set; }
        public string Lost_Reason__c{ get; set; }
        public string SDR__c{ get; set; }
        /* Select the competition
        */
        public string Won_Against__c{ get; set; }
        /* Select the competition
        */
        public string Competitor__c{ get; set; }
        /* Loanpal 20yr 2.99% requires Manager Approval
        */
        public string Payment_Method__c{ get; set; }
        public string Project_Status__c{ get; set; }
        /* Monthly solar payment
        */
        public Decimal Monthly_Solar_Payment__c{ get; set; }
        /* Please type the competitor name
        */
        public string Other_Competitor__c{ get; set; }
        /* Please describe the reason why this project is on hold.
        */
        public string Hold_Reason__c{ get; set; }
        public string Market_Segment__c{ get; set; }
        public string Payment_Notes__c{ get; set; }
        /* Total quantity of inverters for this opportunity
        */
        public Double Quantity_of_Inverters__c{ get; set; }
        /* Was the NMA was signed by the customer?
        */
        public bool NMA_Signed__c{ get; set; }
        /* Completion DateTime for the Perfect Packet
        */
        public DateTime Perfect_Packet_Completion_DateTime__c{ get; set; }
        /* Purchase & Installation Agreement signed?
        */
        public bool Purchase_Installation_Agreement__c{ get; set; }
        /* Financial documents received?
        */
        public bool Finance_Docs_Signed__c{ get; set; }
        /* Total quantity of panels for this opportunity
        */
        public Double Quantity_of_Panels__c{ get; set; }
        /* Quantity of Panels x Wattage per Panel
        */
        public Double Total_Wattage__c{ get; set; }
        public string System_Size__c{ get; set; }
        public Decimal Total_System_Value__c{ get; set; }
        public Decimal Total_Sale_Price__c{ get; set; }
        public DateTime Inspection_Requested_DateTime__c{ get; set; }
        public Double X1st_Year_Estimated_Production__c{ get; set; }
        /* 1st year estimated production divided by estimated current usage
        */
        public Double Estimated_Offset__c{ get; set; }
        /* (1st year estimated production) - (estimated current usage)
        */
        public string Over_Production__c{ get; set; }
        public Decimal Payment_Amount__c{ get; set; }
        public Decimal Estimated_25yr_Savings__c{ get; set; }
        public DateTime Contract_Signed_DateTime__c{ get; set; }
        /* The DateTime the site analysis is scheduled.
        */
        public DateTime Site_Analysis_Scheduled_DateTime__c{ get; set; }
        /* The DateTime the site analysis was completed.
        */
        public DateTime Site_Analysis_Completion_DateTime__c{ get; set; }
        public Double Number_of_Payments__c{ get; set; }
        /* % of Total Sale Price
        */
        public Decimal Estimated_Incentives__c{ get; set; }
        /* Total Sale Price minus Estimated Incentives
        */
        public Decimal Net_Investment__c{ get; set; }
        public string Panel_Manufacturer__c{ get; set; }
        public string Inverter_Manufacturer__c{ get; set; }
        public DateTime System_Live_DateTime__c{ get; set; }
        public Double Estimated_Current_Usage_kWh__c{ get; set; }
        /* Financial documents received?
        */
        public bool Finance_Docs_Received__c{ get; set; }
        public bool Prevent_Default__c{ get; set; }
        public bool Prevent_Total_Sales_Price_Syncing__c{ get; set; }
        /* Identifies the installation location.
        */
        public string Project_Address__c{ get; set; }
        /* Identifies the installation location.
        */
        public string Project_City__c{ get; set; }
        /* Identifies the installation location.
        */
        public string Project_State__c{ get; set; }
        public string Project_Status_Bar__c{ get; set; }
        public string Project_Status_Orb__c{ get; set; }
        public string Project_Zip_Code__c{ get; set; }
        public Double Number_Of_Projects__c{ get; set; }
        public bool Electrical_Upgrade__c{ get; set; }
        public bool Relocate_Service__c{ get; set; }
        public bool Roof__c{ get; set; }
        public bool Ground_Mount__c{ get; set; }
        public bool Detached_Structure__c{ get; set; }
        public bool Other__c{ get; set; }
        public string P_I_Notes__c{ get; set; }
        public string Utility_Company__c{ get; set; }
        public Double Interest_Rate__c{ get; set; }
        /* The name of the Panel in this Opportunity's Opportunity Products
        */
        public string Panel_Name__c{ get; set; }
        /* The name of the inverter in this Opportunity's Opportunity Products
        */
        public string Inverter_Name__c{ get; set; }
        /* Wattage per panel
        */
        public Double Panel_Wattage__c{ get; set; }
        public Double Inverter_Quantity__c{ get; set; }
        public string Agent_Name__c{ get; set; }
        /* Liability Insurance carrier name
        */
        public string Carrier__c{ get; set; }
        public string County__c{ get; set; }
        public string Electric_Service_Acct_No__c{ get; set; }
        public string HOA_Approval_Received__c{ get; set; }
        public string HOA_Needs_Engagement__c{ get; set; }
        public DateTime Installation_Completed_DateTime__c{ get; set; }
        public DateTime Installation_Scheduled_DateTime__c{ get; set; }
        public bool Insurance_Information_Received__c{ get; set; }
        public string PolicyLiabilityLimit__c{ get; set; }
        public bool Monitoring_Account_Created__c{ get; set; }
        public string Municipality__c{ get; set; }
        public string Phone_Number__c{ get; set; }
        public string Project_Name__c{ get; set; }
        /* If the Project Address is the same as the account's Mailing Address, check this box and the Project address will automatically be added after save.
        */
        public bool Same_as_Mailing_Address__c{ get; set; }
        public string Project_Orb__c{ get; set; }
        /* Was the proposal created?
        */
        public bool Proposal_Created_DateTime__c{ get; set; }
        public string Energy_Consultant__c{ get; set; }
        /* Was an EC assigned?
        */
        public bool EC_Assigned__c{ get; set; }
        /* Was the design created?
        */
        public bool Design_Complete__c{ get; set; }
        public DateTime Inspection_Passed_DateTime__c{ get; set; }
        /* DateTime and time of initial appointment
        */
        public DateTime Initial_Appt_DateTime__c{ get; set; }
        public string HOA_Approved__c{ get; set; }
        /* DateTime this Opportunity was originally created as a Lead in SalesRabbit
        */
        public DateTime SalesRabbit_Created_DateTime__c{ get; set; }
        public string SalesRabbit_Notes__c{ get; set; }
        public bool Competitive_RFP__c{ get; set; }
        /* Paste the URL for the Go Solo CAD here
        */
        public string Go_Solo_CAD_URL__c{ get; set; }
        /* DateTime/time HOA/ACC information was received.
        */
        public DateTime HOA_Received__c{ get; set; }
        public Decimal Pre_solar_Monthly_Payment__c{ get; set; }
        public string Isthereadiscount__c{ get; set; }
        public string Discount_Application__c{ get; set; }
        public Decimal Discount_Amount__c{ get; set; }
        public string Discount_Explanation__c{ get; set; }
        /* What is the name of the customer that referred this opportunity to us?
        */
        /* What is the name of the customer that referred this opportunity to us?
        */
        public string Referral_Customer_Name__c{ get; set; }
        public string Project_Manager__c{ get; set; }
        /* Use this field if there are multiple Opportunities related to an RFP
        */
        public bool Multiple_Opportunity_RFP__c{ get; set; }
        /* Description of the design related to this opportunity.
        */
        public string Design_Description__c{ get; set; }
        public bool Value_Equals_Price__c{ get; set; }
        public DateTime CAD_Packet_Received_DateTime__c{ get; set; }
        public bool Customer_Confirmed_Install_DateTime__c{ get; set; }
        public DateTime Job_Funded__c{ get; set; }
        public DateTime Finance_Report_Sent_DateTime__c{ get; set; }
        public DateTime NMA_Submitted_DateTime__c{ get; set; }
        public DateTime Local_Gov_Permits_Submitted_DateTime__c{ get; set; }
        public DateTime NMA_Approved_DateTime__c{ get; set; }
        public DateTime Local_Gov_Permits_Approved_DateTime__c{ get; set; }
        public string Type_Electrical__c{ get; set; }
        public string Size__c{ get; set; }
        public string Number_of_Spaces__c{ get; set; }
        public string Meter__c{ get; set; }
        public string Meter_Brand__c{ get; set; }
        public string Meter_Type__c{ get; set; }
        public string Square_D_Type__c{ get; set; }
        public string Eaton_Type__c{ get; set; }
        public DateTime CAD_Sent__c{ get; set; }
        public bool Apply_WI_Formula__c{ get; set; }
        public DateTime LastModifiedStageDateTime__c{ get; set; }
        public Double Age__c{ get; set; }
        public string HOA_Customer_Completing__c{ get; set; }
        public Double AC_System_Size__c{ get; set; }
        /* Text from the lead email
        */
        public string Solar_Review_Home_Advisor_Notes__c{ get; set; }
        public bool Cancel_Email_Triggers__c{ get; set; }
        public string SA_Review_Completed_By__c{ get; set; }
        public string CAD_Review_Completed_By__c{ get; set; }
        public string Schedule_Type__c{ get; set; }
        public Decimal Referrer_Bonus__c{ get; set; }
        public string Referrer_Email__c{ get; set; }
        public string Referrer_Phone__c{ get; set; }
        public string Referrer__c{ get; set; }
        public DateTime CAD_Requested_DateTime__c{ get; set; }
        public bool SA_Files_Available__c{ get; set; }
        public bool CAD_Available__c{ get; set; }
        public DateTime Commissioned_DateTime__c{ get; set; }
        public bool Unique_Electrical__c{ get; set; }
        public DateTime Incentive_Approved__c{ get; set; }
        public DateTime Incentive_Requested__c{ get; set; }
        public DateTime X3_Day_Right_to_Cancel_DateTime__c{ get; set; }
        /* Count Number of Days from Stage = Contract Signed to Stage = Project Complete
        */
        public Double Count_Number_of_Days__c{ get; set; }
        public DateTime Stage_move_to_Project_Complete__c{ get; set; }
        public bool ECU_Installed__c{ get; set; }
        public string Electrical_Install_Completed_By__c{ get; set; }
        public string Local_State_Incentives__c{ get; set; }
        public string System_Designer__c{ get; set; }
        public bool Secondary_Proposal_Option__c{ get; set; }
        /* DateTime and time the insurance information was received.
        */
        public DateTime Insurance_Received__c{ get; set; }
        public string Electrical_Notes__c{ get; set; }
        public bool Unhappy_Customer__c{ get; set; }
        public bool Placard_Ordered__c{ get; set; }
        public string Energy_Consultant_lookup__c{ get; set; }
        public bool Trigger_Electrical_Engineering_Sent__c{ get; set; }
        public bool Trigger_HOA_Information_Sent__c{ get; set; }
        public bool Trigger_Homeowners_Insurance_Sent__c{ get; set; }
        public bool Trigger_Inspection_Passed_Sent__c{ get; set; }
        public bool Trigger_Install_Complete_Sent__c{ get; set; }
        public bool Trigger_Installation_Scheduled_Sent__c{ get; set; }
        public bool Trigger_Local_Gov_Permitting_Sent__c{ get; set; }
        public bool Trigger_Monitoring_Account_Created_Sent__c{ get; set; }
        public bool Trigger_NMA_Approved_Sent__c{ get; set; }
        public bool Trigger_Permits_Approved_Sent__c{ get; set; }
        public bool Trigger_Structural_Engineering_Sent__c{ get; set; }
        public bool Trigger_System_is_Live_Sent__c{ get; set; }
        public bool Trigger_Welcome_Email_Sent__c{ get; set; }
        public string SDR_lookup__c{ get; set; }
        /* Permits require pickup at local municipality
        */
        public bool Permits_Ready_for_Pickup__c{ get; set; }
        public string Finance_Notes__c{ get; set; }
        public Double Federal_Incentive__c{ get; set; }
        /* Check box once permits are in hand
        */
        public bool Permits_Picked_Up__c{ get; set; }
        /* Is this an old project?
        */
        public bool Completed_Project__c{ get; set; }
        public string HOA_Notes__c{ get; set; }
        /* Select the correct HOA/ACC Account
        */
        /* Select the correct HOA/ACC Account
        */
        public string HOA_ACC__c{ get; set; }
        public bool Previous_Damage_Detected__c{ get; set; }
        public string Previous_Damage_Detected_Notes__c{ get; set; }
        public bool Service_Upgrade__c{ get; set; }
        public string Lead_Source_Notes__c{ get; set; }
        /* PM Team has verified panel count matches initial design
        */
        public bool CAD_Panel_Verification__c{ get; set; }
        /* Finance Docs Countersigned?
        */
        public bool Finance_Docs_Countersigned__c{ get; set; }
        public string Utility_Company_Piclist__c{ get; set; }
        public string Email_of_Contact_In_Contact_Role__c{ get; set; }
        public string Name_of_Contact_In_Contact_Role__c{ get; set; }
        public string Phone_of_Contact_In_Contact_Role__c{ get; set; }
        public string House_Notes__c{ get; set; }
        public string Roof_Type__c{ get; set; }
        /* (Years)
        */
        public string Estimate_Roof_s_Age__c{ get; set; }
        public string Roof_Material_Type__c{ get; set; }
        public string Roof_Material_Type_Notes__c{ get; set; }
        /* (Degrees)
        */
        public Double Roof_Tilt__c{ get; set; }
        public string Roof_Frame_Structure_Type__c{ get; set; }
        /* (Inches)
        */
        public string Rafter_Size__c{ get; set; }
        /* (Inches on Center)
        */
        public Double Rafter__c{ get; set; }
        public string Sheathing_or_Decking_Type__c{ get; set; }
        public string Roof_Frame_Structure_Type_Notes__c{ get; set; }
        public string Sheathing_or_Decking_Type_Notes__c{ get; set; }
        public string Meter_Manufacturer_Notes__c{ get; set; }
        public string Main__c{ get; set; }
        public string Main_Service__c{ get; set; }
        public string Safety_Notes__c{ get; set; }
        public bool Structural_Integrity_Evaluation_Required__c{ get; set; }
        public bool Roof_Leaks__c{ get; set; }
        public bool Roof_Material_Damage__c{ get; set; }
        public bool Other_Damage_Existing_Conditions__c{ get; set; }
        public string Utility__c{ get; set; }
        public string Utility_Feed_Notes__c{ get; set; }
        /* Is there a sub-panel?
        */
        public bool Sub__c{ get; set; }
        public string Main_Service_Panel_Mounting_Type__c{ get; set; }
        public string Main_Panel_Total_Breaker_Spaces_Notes__c{ get; set; }
        public string Main_Service_Panel_Manufacturers__c{ get; set; }
        public string Main_Service_Panel_Manufacturer_Notes__c{ get; set; }
        public DateTime Take_Back_DateTime__c{ get; set; }
        public bool Permits_Ready_to_Print__c{ get; set; }
        public DateTime Installation_Rescheduled_DateTime__c{ get; set; }
        public bool Podium_Survey_Sent__c{ get; set; }
        public string Paint_Color__c{ get; set; }
        public bool Trigger_10_days_post_CAD_packet_received__c{ get; set; }
        public string HOA_ACC_Contact_Info__c{ get; set; }
        public bool Take_back__c{ get; set; }
        public string Service_Upgrade_Amount__c{ get; set; }
        /* Cost of service upgrade if over $2,000
        */
        public Decimal Service_Upgrade_Amount_Notes__c{ get; set; }
        public DateTime HOA_ACC_Initial_Approval_Request__c{ get; set; }
        public string Contact_Name__c{ get; set; }
        public string Email__c{ get; set; }
        public string First_Name__c{ get; set; }
        public string Last_Name__c{ get; set; }
        public DateTime DateTime_of_Site_Analysis__c{ get; set; }
        public string Site_Analysis_Technician__c{ get; set; }
        /* Installation photos, post-installation paperwork application, etc. *see utility account for specifics
        */
        public bool Construction_Photos_Sent_to_Utility_Co__c{ get; set; }
        /* Is there a Commissioned DateTime?
        */
        public bool Commissioned_DateTime_Check__c{ get; set; }
        public bool X6029_Approval__c{ get; set; }
        public string Nature_of_System_Installation__c{ get; set; }
        public bool Final_System_Design_Reviewed__c{ get; set; }
        /* Tracks the UTM parameters from digital ad platforms such as Facebook, LinkedIn, and Google Ads.
        */
        public string UTM_Campaign__c{ get; set; }
        /* Tracks the UTM parameters from digital ad platforms such as Facebook, LinkedIn, and Google Ads.
        */
        public string UTM_Content__c{ get; set; }
        /* Tracks the UTM parameters from digital ad platforms such as Facebook, LinkedIn, and Google Ads.
        */
        public string UTM_Medium__c{ get; set; }
        /* Tracks the UTM parameters from digital ad platforms such as Facebook, LinkedIn, and Google Ads.
        */
        public string UTM_Source__c{ get; set; }
        /* Tracks the UTM parameters from digital ad platforms such as Facebook, LinkedIn, and Google Ads.
        */
        public string UTM_Term__c{ get; set; }
        public Double Original_1st_Year_Estimated_Production__c{ get; set; }
        public Double Original_Estimated_Offset__c{ get; set; }
        public Double Final_Adjusted_Est_1st_Year_Production__c{ get; set; }
        public Double Final_Adjusted_Est_Offset__c{ get; set; }
        public DateTime HOA_Initial_Approval_Request_Email_Sent__c{ get; set; }
        public DateTime Demoed_Stage_Change_DateTime__c{ get; set; }
        public DateTime Lost_Stage_Change_DateTime__c{ get; set; }
        public DateTime RFP_Stage_Change_DateTime__c{ get; set; }
        public string Cancellation_Reason__c{ get; set; }
        public string Install_Time_Frame__c{ get; set; }
        public string Report_Stage__c{ get; set; }
        public DateTime Report_Stage_DateTime__c{ get; set; }
        public Double Report_Stage_DateTime_Number__c{ get; set; }
        /* The system wide number assigned to this Opportunity
        */
        public string Opportunity_Number__c{ get; set; }
        public Double Incentive_Amount__c{ get; set; }
        public string Promo_Code__c{ get; set; }
        public string Cancellation_Explanation__c{ get; set; }
        public string Inspection_Completed__c{ get; set; }
        public DateTime Inspection_Completed_DateTime__c{ get; set; }
        public string X20_Year__c{ get; set; }
        public string X15_Year__c{ get; set; }
        /* Alliant requires meter number
        */
        public string Meter_Number__c{ get; set; }
        /* Check if you don't want this appointment to try and be rescheduled
        */
        public bool Do_Not_Reschedule__c{ get; set; }
        public Decimal Annual_Bill__c{ get; set; }
        public Double Remaining_Offset__c{ get; set; }
        public string Electrician_Scheduled__c{ get; set; }
        public string Design_Review__c{ get; set; }
        public bool SA_Completed_Check__c{ get; set; }
        /* Opportunity Contact Role marked as "Co-borrower"
        */
        /* Opportunity Contact Role marked as "Co-borrower"
        */
        public string Co_borrower__c{ get; set; }
        public string Co_borrower_First_Name__c{ get; set; }
        public string Co_borrower_Last_Name__c{ get; set; }
        public string Co_borrower_Email__c{ get; set; }
        /* Is the Utility Company required for the installation?
        */
        public string Utility_Required__c{ get; set; }
        public Decimal Estimated_25_Year_Cost__c{ get; set; }
        public Decimal Thirty_Percent_of_System_Value__c{ get; set; }
        /* DateTime the NMA was sent to the customer
        */
        public DateTime NMA_Sent_to_Customer__c{ get; set; }
        public bool NMA_Sent_Check__c{ get; set; }
        public DateTime Site_Analysis_Rescheduled_DateTime__c{ get; set; }
        public DateTime Inspection_Rescheduled_DateTime__c{ get; set; }
        /* Insurance Agent email address
        */
        public string Agent_Email__c{ get; set; }
        /* Does the customer have specific requests for the panels location?
        */
        public bool Customer_Requests_Specific_Design__c{ get; set; }
        public DateTime Current_DateTime__c{ get; set; }
        public bool Panel_Installation_Completed__c{ get; set; }
        public string AP__c{ get; set; }
        public string Troubleshooting_Notes__c{ get; set; }
        /* DateTime the customer let us know they needed assistance with their monitoring account
        */
        public DateTime DateTime_Issued__c{ get; set; }

        public List<OpportunityContactRole> OpportunityContactRoles { get; set; }
    }

    public class OpportunityContactRole
    {
        public string Id;
        public Opportunity Opportunity;
        public string OpportunityId;
        public string ContactId;
        public String Role;
        public Boolean IsPrimary;
        public DateTime CreatedDate;
        public string CreatedById;
        public DateTime LastModifiedDate;
        public string LastModifiedById;
        public Boolean IsDeleted;
    }
}