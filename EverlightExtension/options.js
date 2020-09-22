var contentWrapper = document.getElementById("content__wrapper");
var clientId = document.getElementById("client_id");
var redirectUrl = document.getElementById("redirect_url");
var clientSecret = document.getElementById("client_secret");
var saveButton = document.getElementById("save_options");

chrome.storage.sync.get(
  ["SF_client_id", "SF_redirect_uri", "SF_client_secret"],
  function(data) {
    if (data["SF_client_id"]) clientId.value = data["SF_client_id"];
    if (data["SF_redirect_uri"]) redirectUrl.value = data["SF_redirect_uri"];
    if (data["SF_client_secret"]) clientSecret.value = data["SF_client_secret"];
  }
);

saveButton.addEventListener("click", function() {
  chrome.storage.sync.set(
    {
      SF_client_id: clientId.value,
      SF_redirect_uri: redirectUrl.value,
      SF_client_secret: clientSecret.value
    },
    () => {
      var logoutWindow = document.getElementById("modalWindow");
      var modalMessage = document.getElementById("modalMessage");
      modalMessage.innerText = "Data saved successfully";
      logoutWindow.style.display = "flex";

      setTimeout(function reloadPage() {
        window.location.reload();
      }, 2000);
    }
  );
});

var wrapper = document.getElementById("variable_wrapper");
var variableButton = document.getElementById("variable_button");
var closeModal = document.getElementById("close_modal");
variableButton.addEventListener("click", function() {
  wrapper.style.display = "flex";
});
closeModal.addEventListener("click", function() {
  wrapper.style.display = "none";
});

var variableTable = document.getElementById("variable_table");
var variableArr = [
  "SF_endpoint_authorization",
  "SF_endpoint_token",
  "SF_endpoint_revoking",
  "ELS_option_url",
  "ELS_start_url",
  "SF_client_id",
  "SF_redirect_uri",
  "SF_client_secret",
  "SF_access_token",
  "SF_id",
  "SF_instance_url",
  "SF_issued_at",
  "SF_refresh_token",
  "SF_scope",
  "SF_signature",
  "SF_token_type",
  "ELS_isLogin",
  "SF_org_id",
  "SF_user_id",
  "SF_instance",
  "SF_username"
];
variableArr.forEach(item => {
  chrome.storage.sync.get(item, data => {
    var tr = document.createElement("tr");
    var key = document.createElement("td");
    var value = document.createElement("td");
    key.innerText = item;
    value.innerText = data[item];
    tr.appendChild(key);
    tr.appendChild(value);
    variableTable.appendChild(tr);
  });
});

var logoutButton = document.getElementById("logout_button");
logoutButton.addEventListener("click", function() {
  var logoutWindow = document.getElementById("modalWindow");
  var modalMessage = document.getElementById("modalMessage");
  modalMessage.innerText = "The logout was successful";
  logoutWindow.style.display = "flex";

  setTimeout($Utils.logout, 2000);
});
