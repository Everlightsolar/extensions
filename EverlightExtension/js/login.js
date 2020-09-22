chrome.storage.sync.get(
  ["SF_endpoint_authorization", "SF_client_id", "SF_redirect_uri"],
  data => {
    if (
      data.SF_endpoint_authorization &&
      data.SF_client_id &&
      data.SF_redirect_uri
    ) {
      var url = "" + data.SF_endpoint_authorization;
      url += "?response_type=code";
      url += "&client_id=" + data.SF_client_id;
      url += "&redirect_uri=" + encodeURIComponent(data.SF_redirect_uri);
      url += "&state=mystate";
      window.location.replace(url);
    }
  }
);
