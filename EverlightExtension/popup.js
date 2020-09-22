var userButton = document.getElementById("user");
var loginButton = document.getElementById("login");
var updateButton = document.getElementById("update");
var optionsButton = document.getElementById("options");
var username = document.getElementById("username");

var hideAllButton = function() {
  userButton.style.display = "none";
  loginButton.style.display = "none";
  updateButton.style.display = "none";
  optionsButton.style.display = "none";
};
hideAllButton();

var showIsLoginButton = function() {
  userButton.style.display = "flex";
  loginButton.style.display = "none";
  updateButton.style.display = "block";
  optionsButton.style.display = "none";
};

var showLoginButton = function() {
  userButton.style.display = "none";
  loginButton.style.display = "block";
  updateButton.style.display = "none";
  optionsButton.style.display = "none";
};

var showOptionButton = function() {
  userButton.style.display = "none";
  loginButton.style.display = "none";
  updateButton.style.display = "none";
  optionsButton.style.display = "block";
};

chrome.storage.sync.get(
  [
    "ELS_isLogin",
    "SF_username",
    "SF_client_id",
    "SF_redirect_uri",
    "SF_client_secret"
  ],
  data => {
    if (data.ELS_isLogin) {
      if (data.SF_username) username.innerText = data.SF_username;
      showIsLoginButton();
    } else {
      if (data.SF_client_id && data.SF_redirect_uri && data.SF_client_secret)
        showLoginButton();
      else showOptionButton();
    }
  }
);

userButton.onclick = function(element) {
  if ($Utils) {
    $Utils.openOptionsPage();
  }
};

loginButton.onclick = function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    var tab = tabs[0] || {};
    if (!(tab.id && tab.url)) return;
    chrome.storage.sync.set({ ELS_start_url: tab.url }, () => {
      chrome.tabs.executeScript(tab.id, { file: "js/login.js" });
    });
  });
};

updateButton.onclick = function(element) {
  $Utils.rerfeshToken(() => {
    alert("Token was updated!");
  });
};

optionsButton.onclick = function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    var tab = tabs[0] || {};
    if (!(tab.id && tab.url)) return;
    chrome.storage.sync.set({ ELS_start_url: tab.url }, () => {
      $Utils.openOptionsPage();
    });
  });
};
