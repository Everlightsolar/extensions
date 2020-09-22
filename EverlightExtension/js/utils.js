window.$Utils =
  window.$Utils ||
  (function() {
    "use strict";
    return {
      openOptionsPage: function() {
        if (chrome.runtime.openOptionsPage) {
          chrome.runtime.openOptionsPage();
        } else {
          chrome.storage.sync.get(["ELS_option_url"], data => {
            if (data.ELS_option_url) {
              window.open(data.ELS_option_url);
            }
          });
        }
      },

      getToken: function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
        xhr.onreadystatechange = () => {
          if (xhr.readyState != 4) return;
          if (xhr.status != 200) return;

          var response = JSON.parse(xhr.responseText);
          if (
            response.access_token &&
            response.id &&
            response.instance_url &&
            response.issued_at &&
            response.refresh_token &&
            response.scope &&
            response.signature &&
            response.token_type
          ) {
            chrome.storage.sync.set(
              {
                SF_access_token: response.access_token,
                SF_id: response.id,
                SF_instance_url: response.instance_url,
                SF_issued_at: response.issued_at,
                SF_refresh_token: response.refresh_token,
                SF_scope: response.scope,
                SF_signature: response.signature,
                SF_token_type: response.token_type
              },
              () => {
                if (response.id && response.id.length > 0) {
                  var arr = response.id.split("/");
                  var instance = response.instance_url
                    .split("/")[2]
                    .split(".")[0];
                  if (arr.length === 6) {
                    chrome.storage.sync.set(
                      {
                        SF_org_id: arr[4],
                        SF_user_id: arr[5],
                        SF_instance: instance
                      },
                      () => {
                        callback();
                      }
                    );
                  }
                }
              }
            );
          }
        };
      },

      getUserInfo: function(callback) {
        chrome.storage.sync.get(
          [
            "SF_instance_url",
            "SF_org_id",
            "SF_user_id",
            "SF_token_type",
            "SF_access_token"
          ],
          data => {
            if (
              data.SF_instance_url &&
              data.SF_org_id &&
              data.SF_user_id &&
              data.SF_token_type &&
              data.SF_access_token
            ) {
              var url =
                data.SF_instance_url +
                "/id/" +
                data.SF_org_id +
                "/" +
                data.SF_user_id;

              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, true);
              xhr.setRequestHeader(
                "Authorization",
                data.SF_token_type + " " + data.SF_access_token
              );
              xhr.send();
              xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) return;

                var response = JSON.parse(xhr.responseText);
                if (response.username) {
                  chrome.storage.sync.set(
                    {
                      SF_username: response.username,
                      ELS_isLogin: true
                    },
                    () => {
                      callback();
                    }
                  );
                }
              };
            }
          }
        );
      },

      rerfeshToken: function(callback) {
        chrome.storage.sync.get(
          [
            "SF_endpoint_token",
            "SF_client_id",
            "SF_client_secret",
            "SF_refresh_token"
          ],
          data => {
            if (
              data.SF_endpoint_token &&
              data.SF_client_id &&
              data.SF_client_secret &&
              data.SF_refresh_token
            ) {
              var url = "" + data.SF_endpoint_token;
              url += "?grant_type=refresh_token";
              url += "&client_id=" + data.SF_client_id;
              url += "&client_secret=" + data.SF_client_secret;
              url += "&refresh_token=" + data.SF_refresh_token;

              var xhr = new XMLHttpRequest();
              xhr.open("POST", url, true);
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.send();
              xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) return;

                var response = JSON.parse(xhr.responseText);
                if (
                  response.access_token &&
                  response.id &&
                  response.instance_url &&
                  response.issued_at &&
                  response.scope &&
                  response.signature &&
                  response.token_type
                ) {
                  chrome.storage.sync.set(
                    {
                      SF_access_token: response.access_token,
                      SF_id: response.id,
                      SF_instance_url: response.instance_url,
                      SF_issued_at: response.issued_at,
                      SF_scope: response.scope,
                      SF_signature: response.signature,
                      SF_token_type: response.token_type
                    },
                    () => {
                      if (response.id && response.id.length > 0) {
                        var arr = response.id.split("/");
                        var instance = response.instance_url
                          .split("/")[2]
                          .split(".")[0];
                        if (arr.length === 6) {
                          chrome.storage.sync.set(
                            {
                              SF_org_id: arr[4],
                              SF_user_id: arr[5],
                              SF_instance: instance
                            },
                            () => {
                              callback();
                            }
                          );
                        }
                      }
                    }
                  );
                }
              };
            }
          }
        );
      },

      logout: function() {
        chrome.storage.sync.remove(
          [
            "SF_access_token",
            "SF_id",
            "SF_instance_url",
            "SF_issued_at",
            "SF_refresh_token",
            "SF_scope",
            "SF_signature",
            "SF_token_type",
            "SF_org_id",
            "SF_user_id",
            "SF_instance",
            "SF_username",
            "ELS_isLogin",
            "SF_client_id",
            "SF_redirect_uri",
            "SF_client_secret",
            "ELS_start_url"
          ],
          () => {
            window.location.reload();
          }
        );
      },

      getContact: function(email, callback) {
        chrome.storage.sync.get(
          ["SF_instance_url", "SF_token_type", "SF_access_token"],
          data => {
            if (
              data.SF_instance_url &&
              data.SF_token_type &&
              data.SF_access_token
            ) {
              var url = data.SF_instance_url + "/services/data/v45.0/query";

              var fields = [
                "Id",
                "AccountId",
                "Email",
                "FirstName",
                "LastName",
                "Phone"
              ];

              var query =
                "?q=SELECT+" +
                fields.join(",+") +
                "+FROM+Contact+WHERE+Email='" +
                email +
                "'";

              var xhr = new XMLHttpRequest();
              xhr.open("GET", url + query, true);
              xhr.setRequestHeader(
                "Authorization",
                data.SF_token_type + " " + data.SF_access_token
              );
              xhr.send();
              xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {
                  this.rerfeshToken(() =>
                    callback({
                      status: xhr.status,
                      tokenUpadte: true
                    })
                  );
                }
                callback(JSON.parse(xhr.responseText));
              };
            }
          }
        );
      },

      getAccount: function(id, callback) {
        chrome.storage.sync.get(
          ["SF_instance_url", "SF_token_type", "SF_access_token"],
          data => {
            if (
              data.SF_instance_url &&
              data.SF_token_type &&
              data.SF_access_token
            ) {
              var url = data.SF_instance_url + "/services/data/v45.0/query";
              var fields = [
                "Id",
                "Mailing_Address__c",
                "Mailing_City__c",
                "Mailing_State__c",
                "Mailing_Zip_Code__c"
              ];
              var query =
                "?q=SELECT+" +
                fields.join(",+") +
                "+FROM+Account+WHERE+Id='" +
                id +
                "'";
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url + query, true);
              xhr.setRequestHeader(
                "Authorization",
                data.SF_token_type + " " + data.SF_access_token
              );
              xhr.send();
              xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) return;
                callback(JSON.parse(xhr.responseText));
              };
            }
          }
        );
      },

      getOpportunity: function(accountId, service, callback) {
        chrome.storage.sync.get(
          ["SF_instance_url", "SF_token_type", "SF_access_token"],
          data => {
            if (
              data.SF_instance_url &&
              data.SF_token_type &&
              data.SF_access_token
            ) {
              var url = data.SF_instance_url + "/services/data/v45.0/query";

              var fields = [
                "Id",
                "AccountId",
                "Project_Address__c",
                "Project_City__c",
                "Project_State__c",
                "Project_Zip_Code__c",
                "Electric_Service_Acct_No__c",
                "Estimated_Current_Usage_kWh__c",
                "Estimated_Offset__c",
                "X1st_Year_Estimated_Production__c",
                "Inverter_Manufacturer__c",
                "Inverter_Name__c",
                "Inverter_Quantity__c",
                "AC_System_Size__c",
                "Carrier__c",
                "Agent_Name__c",
                "Phone_Number__c",
                "PolicyLiabilityLimit__c",
                "County__c",
                "Panel_Name__c",
                "Meter_Number__c"
              ];

              var otherFilter = "";
              if(service == "ALLIANT")
                otherFilter = "+AND+StageName+IN('CAD+Created','Permits+Submitted')";
              else if(service == "APSYSTEMS")
                otherFilter = "+AND+StageName='Installation+Complete'";

              var query =
                "?q=SELECT+" +
                fields.join(",+") +
                "+FROM+Opportunity+WHERE+AccountId='" +
                accountId +
                "'" +
                otherFilter +
                "+ORDER+BY+LastModifiedDate+DESC+LIMIT+1";

              var xhr = new XMLHttpRequest();
              xhr.open("GET", url + query, true);
              xhr.setRequestHeader(
                "Authorization",
                data.SF_token_type + " " + data.SF_access_token
              );
              xhr.send();
              xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) return;
                callback(JSON.parse(xhr.responseText));
              };
            }
          }
        );
      },

      getMetadataAlliant: function(callback) {
        chrome.storage.sync.get(
          ["SF_instance_url", "SF_token_type", "SF_access_token"],
          data => {
            if (
              data.SF_instance_url &&
              data.SF_token_type &&
              data.SF_access_token
            ) {
              var url = data.SF_instance_url + "/services/data/v45.0/query";

              var fields = [
                "Id",
                "Applicant_Title__c",
                "Applicant_s_Ownership__c",
                "Primary_Intent__c",
                "Installing_Contractor__c",
                "IC_First_Name__c",
                "IC_Last_Name__c",
                "IC_Company__c",
                "IC_Street__c",
                "IC_City__c",
                "IC_State__c",
                "IC_Zip_Code__c",
                "IC_Email__c",
                "IC_Phone__c",
                "Extended_Project__c",
                "Energy_Source__c",
                "Generation_Type__c",
                "Certification_Of_Equipment__c",
                "Is_Interconnection_Customer__c",
                "Version_No_Generator_Inverter__c",
                "Serial_No_Generator_Inverter__c",
                "Generation_Type_Phases__c",
                "Generator_Inverter_Rated_Voltage__c",
                "If_Not_Certified__c",
                "Is_Additional_New_Energy__c",
                "Requested_Interconnection_Application__c",
                "Installation_Type__c",
                "Are_Additional_Inverters__c",
                "Customer_Type__c",
                "Transformer_Be_Installed__c",
                "Nameplate_Rating_kVA__c",
                "Nameplate_Rating_kW__c"
              ];

              var query =
                "?q=SELECT+" +
                fields.join(",+") +
                "+FROM+Alliant_Energy__mdt+WHERE+QualifiedApiName='Google_Extensions'";

              var xhr = new XMLHttpRequest();
              xhr.open("GET", url + query, true);
              xhr.setRequestHeader(
                "Authorization",
                data.SF_token_type + " " + data.SF_access_token
              );
              xhr.send();
              xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) return;
                callback(JSON.parse(xhr.responseText));
              };
            }
          }
        );
      },

      getMetadataAPSystem: function(callback) {
        chrome.storage.sync.get(
          ["SF_instance_url", "SF_token_type", "SF_access_token"],
          data => {
            if (
              data.SF_instance_url &&
              data.SF_token_type &&
              data.SF_access_token
            ) {
              var url = data.SF_instance_url + "/services/data/v45.0/query";

              var fields = [
                "Id",
                "User_Type__c",
                "Password__c",
                "Partner__c",
                "Installer__c",
                "Country__c",
                "Grid_Type__c",
                "PMax__c"
              ];

              var query =
                "?q=SELECT+" +
                fields.join(",+") +
                "+FROM+AP_Systems__mdt+WHERE+QualifiedApiName='Google_Extensions'";

              var xhr = new XMLHttpRequest();
              xhr.open("GET", url + query, true);
              xhr.setRequestHeader(
                "Authorization",
                data.SF_token_type + " " + data.SF_access_token
              );
              xhr.send();
              xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) return;
                callback(JSON.parse(xhr.responseText));
              };
            }
          }
        );
      },

      getMetadataNovaPortal: function(callback) {
        chrome.storage.sync.get(
          ["SF_instance_url", "SF_token_type", "SF_access_token"],
          data => {
            if (
              data.SF_instance_url &&
              data.SF_token_type &&
              data.SF_access_token
            ) {
              var url = data.SF_instance_url + "/services/data/v45.0/query";
              var fields = ['id', 'Agent_Or_Holder__c', 'Agent_Company_Name__c', 'Contact_Persons_Name__c', 'Contact_Phone_Number__c', 'Contact_Email_Address__c'];
              var query = "?q=SELECT+" + fields.join(",+") + "+FROM+Nova_Portal__mdt+WHERE+QualifiedApiName='Google_Extensions'";

              var xhr = new XMLHttpRequest();
              xhr.open("GET", url + query, true);
              xhr.setRequestHeader("Authorization",  data.SF_token_type + " " + data.SF_access_token);
              xhr.send();
              xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) return;
                callback(JSON.parse(xhr.responseText));
              };
            }
          }
        );
      }
    };
  })();
