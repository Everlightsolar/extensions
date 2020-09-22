chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({SF_endpoint_authorization: "https://login.salesforce.com/services/oauth2/authorize"});
  chrome.storage.sync.set({SF_endpoint_token: "https://login.salesforce.com/services/oauth2/token"});
  chrome.storage.sync.set({SF_endpoint_revoking: "https://login.salesforce.com/services/oauth2/revoke"});
  chrome.storage.sync.set({ELS_option_url: chrome.runtime.getURL("options.html")});

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "alliantenergyconnect.powerclerk.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

  if (message.createTokenUrl) {
    $Utils.getToken(message.createTokenUrl, () => {
      $Utils.getUserInfo(() => {
        console.log("ALL DATA SAVED");
      });
    });
    sendResponse({ saveToken: true });


  } else if (message.getContact) {
    $Utils.getContact(message.getContact, response => {
      sendResponse({...response});
    });

  } else if (message.getMetadataAlliant) {
    $Utils.getMetadataAlliant(response => {
      sendResponse({...response});
    });

  } else if (message.getMetadataAPSystem) {
    $Utils.getMetadataAPSystem(response => {
      sendResponse({...response});
    });

  } else if (message.getMetadataNovaPortal) {
    $Utils.getMetadataNovaPortal(response => {
      sendResponse({...response});
    });

  } else if (message.getAccount) {
    $Utils.getAccount(message.getAccount, response => {
      sendResponse({...response});
    });

  } else if (message.getOpportunity) {
    $Utils.getOpportunity(message.getOpportunity, message.service, response => {
      sendResponse({...response});
    });
  }

  return true;
});
