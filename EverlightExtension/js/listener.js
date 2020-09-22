var arguments = {};

if (window.location.search && window.location.search.length > 0) {
  var search = window.location.search.substring(1);
  if (search.length > 0) {
    var arguments_arr = search.split("&");
    if (arguments_arr.length > 0) {
      arguments_arr.forEach(item => {
        var item_arr = item.split("=");
        var key = item_arr[0];
        var value = item_arr[1];
        arguments[key] = value;
      });
    }
  }
}

if (arguments.ReturnUrl && arguments.code && arguments.state) {
  chrome.storage.sync.set({ SF_code: arguments.code }, () => {
    chrome.storage.sync.get(
      [
        "SF_endpoint_token",
        "SF_client_id",
        "SF_client_secret",
        "SF_redirect_uri"
      ],
      data => {
        if (
          data.SF_endpoint_token &&
          data.SF_client_id &&
          data.SF_client_secret &&
          data.SF_redirect_uri
        ) {
          var url = "" + data.SF_endpoint_token;
          url += "?grant_type=authorization_code";
          url += "&code=" + arguments.code;
          url += "&client_id=" + data.SF_client_id;
          url += "&client_secret=" + data.SF_client_secret;
          url += "&redirect_uri=" + encodeURIComponent(data.SF_redirect_uri);

          chrome.runtime.sendMessage({ createTokenUrl: url }, response => {
            if (response.saveToken) {
              chrome.storage.sync.get("ELS_start_url", data => {
                window.location.replace(data.ELS_start_url);
              });
            }
          });
        }
      }
    );
  });
}
