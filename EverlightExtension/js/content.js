var SF_data = {
  contact: {},
  metadata: {},
  account: {},
  opportunity: {}
};
var errorList = [];
var currentService = '';
var currentPage = 0;

window.onload = function() {

  var addSalesforseButton = function() {
    if (window == window.parent) {
      var button = document.createElement('div');
      button.setAttribute('class', 'salesforse__button');
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1516">
          <path class="fil0" d="M500 1516c-40,0 -72,-32 -72,-72 0,-39 32,-71 72,-71l255 0 245 -256 245 256 256 0c40,0 72,32 72,71 0,40 -32,72 -72,72l-317 0 -184 -193 -184 193 -316 0zm500 -1006c271,0 491,219 491,491 0,82 -21,160 -57,229l-172 0c53,-62 86,-142 86,-229 0,-193 -156,-348 -348,-348 -192,0 -348,155 -348,348 0,87 33,167 86,229l-172 0c-36,-69 -57,-147 -57,-229 0,-272 220,-491 491,-491zm-708 -116c-27,-28 -27,-73 0,-101 28,-28 74,-28 102,0l162 162c24,28 23,71 -4,97 -27,27 -69,28 -97,4l-163 -162zm1257 158c-28,28 -73,28 -101,0 -28,-27 -28,-73 0,-101l162 -162c28,-24 71,-23 98,4 26,27 27,69 3,97l-162 162zm-477 -257c0,40 -32,72 -72,72 -40,0 -72,-32 -72,-72l1 -229c2,-37 33,-66 71,-66 38,0 69,29 71,66l1 229zm-1001 777c-40,0 -72,-32 -72,-71 0,-40 32,-72 72,-72l229 0c37,3 66,34 66,72 0,37 -29,68 -66,71l-229 0zm1634 0c-39,0 -71,-32 -71,-71 0,-40 32,-72 71,-72l229 0c37,3 67,34 67,72 0,37 -30,68 -67,71l-229 0z"/>
        </svg>
      `;
      document.body.appendChild(button);
    }

    button.addEventListener('click', () => {
      var panel = document.getElementById('salesforsePanel');
      if (panel) {
        panel.classList.add('salesforse__panel-active');
        checkService();
        checkForm();
      }
    });
  };

  var checkService = function() {
    let url = window.location.origin;
    if (url.indexOf('alliantenergyconnect') != -1) currentService = 'ALLIANT';
    else if (url.indexOf('apsystemsema') != -1) currentService = 'APSYSTEMS';
    else if (url.indexOf('novapowerportal') != -1) currentService = 'NOVAPORTAL';
    else currentService = '';
  };

  var checkForm = function() {

    // ALLIANT
    if (currentService == 'ALLIANT') {
      let headers = document.querySelectorAll('h1');
      let flagHeaders = false;
      headers.forEach(item => {
        if (item.innerText == 'Alliant Energy Interconnection Application') flagHeaders = true; 
      });

      let pageHeaders = [];
      pageHeaders.push(document.getElementById('page-header1'));
      pageHeaders.push(document.getElementById('page-header2'));
      pageHeaders.push(document.getElementById('page-header3'));
      pageHeaders.push(document.getElementById('page-header4'));
      pageHeaders.push(document.getElementById('page-header5'));
      pageHeaders.push(document.getElementById('page-header6'));
      pageHeaders.push(document.getElementById('page-header7'));
      pageHeaders.push(document.getElementById('page-header8'));
      pageHeaders.push(document.getElementById('page-header9'));
      pageHeaders.push(document.getElementById('page-header10'));
      pageHeaders.push(document.getElementById('page-header11'));
      pageHeaders.push(document.getElementById('page-header12'));
      pageHeaders.push(document.getElementById('page-header13'));
      pageHeaders.push(document.getElementById('page-header14'));
      let flagPageHeaders = true;
      pageHeaders.forEach(item => {
        if (!item) flagPageHeaders = false; 
      });

      if (flagHeaders && flagPageHeaders) {
        pageHeaders.forEach(item => {
          if (
            item && item.children[0] && item.children[0].classList.contains('bg-primary-brand-dark') &&
            item.children[0].innerText && item.children[0].innerText.length > 0
          ) currentPage = item.children[0].innerText * 1; 
        });
      } else {
        currentPage = 0;
      }


    // APSYSTEMS
    } else if (currentService == 'APSYSTEMS') {
      currentPage = 1;

    // NOVAPORTAL
    } else if (currentService == 'NOVAPORTAL') {
      currentPage = 0;
      let form = document.querySelector('form[id="novaForm"]');
      if (form && form.hasAttribute('action')) {
        let action = form.getAttribute('action');
        if (action.indexOf('AccountHolder') != -1 && action.indexOf('NewApplication') != -1) {
          currentPage = 1;
        }
      }
    }
  };

  var addSalesforsePanel = function() {
    if (window == window.parent) {
      var panel = document.createElement('div');
      panel.setAttribute('id', 'salesforsePanel');
      panel.setAttribute('class', 'salesforse__panel');
      panel.innerHTML = `
        <div class="panel__title">Extension panel</div>
        <div class="panel__close" id="salesforsePanelClose">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </div>
        <div class="panel__content" id="salesforsePanelContent"></div>
      `;
      document.body.appendChild(panel);
    }

    var buttonClose = document.getElementById('salesforsePanelClose');
    if (buttonClose) {
      buttonClose.addEventListener('click', () => {
        var panel = document.getElementById('salesforsePanel');
        if (panel) {
          panel.classList.remove('salesforse__panel-active');
        }
      });
    }
  };

  var addPanelEmailInput = function() {
    var panelContent = document.getElementById('salesforsePanelContent');
    if (panelContent) {
      var panelEmailInput = document.createElement('div');
      panelEmailInput.setAttribute('id', 'salesforsePanelEmailInput');
      panelEmailInput.setAttribute('class', 'panel__email-input');
      panelEmailInput.innerHTML = `
        <label for="salesforsePanelEmailInputInput" class="panel__email-input__label">Contact email</label>
        <input id="salesforsePanelEmailInputInput" name="salesforsePanelEmailInputInput" class="panel__email-input__input">
        <div id="salesforsePanelEmailInputError" class="panel__email-input__error"></div>
        <button id="salesforsePanelEmailInputButton" class="panel__email-input__button">Search contact</button>
      `;
      panelContent.appendChild(panelEmailInput);
    }

    // CLICK TO BUTTON
    var panelEmailInputButton = document.getElementById('salesforsePanelEmailInputButton');
    if (panelEmailInputButton) {
      panelEmailInputButton.addEventListener('click', () => {
        var panelEmailInputInput = document.getElementById('salesforsePanelEmailInputInput');
        if (
          panelEmailInputInput &&
          panelEmailInputInput.value.length > 0 &&
          panelEmailInputInput.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        ) {
          showSpinner();
          hidePanelMessage();
          hideFillButton();
          hideErrorTable();
          hidePanelEmailInputError();
          getContactData(panelEmailInputInput.value);

        } else {
          hidePanelMessage();
          hideFillButton();
          showPanelEmailInputError('Enter the correct email');
        }
      });
    }

    // CHANGE EMAIL IN INPUT
    var panelEmailInputInput = document.getElementById('salesforsePanelEmailInputInput');
    if (panelEmailInputInput) {
      panelEmailInputInput.addEventListener('input', () => {
        if (
          panelEmailInputInput.value.length > 0 &&
          panelEmailInputInput.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        ) {
          hidePanelEmailInputError();
        }
      });
    }

  };

  var showPanelEmailInputError = function(message) {
    var panelEmailInputError = document.getElementById('salesforsePanelEmailInputError');
    if (panelEmailInputError) {
      panelEmailInputError.innerText = message;
    }
  };

  var hidePanelEmailInputError = function() {
    var panelEmailInputError = document.getElementById('salesforsePanelEmailInputError');
    if (panelEmailInputError) {
      panelEmailInputError.innerText = '';
    }
  };

  var showSpinner = function() {
    var salesforsePanel = document.getElementById('salesforsePanel');
    if (salesforsePanel) {
      var salesforsePanelSpinner = document.createElement("div");
      salesforsePanelSpinner.setAttribute('id', 'salesforsePanelSpinner');
      salesforsePanelSpinner.classList.add('panel__spinner');
      salesforsePanelSpinner.innerHTML = `
        <div class="panel__spinner__content">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M12.9 3.1c1.3 1.2 2.1 3 2.1 4.9 0 3.9-3.1 7-7 7s-7-3.1-7-7c0-1.9.8-3.7 2.1-4.9l-.8-.8c-1.4 1.5-2.3 3.5-2.3 5.7 0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.2-.9-4.2-2.3-5.7l-.8.8z"></path>
          </svg>
        </div>
      `;
      salesforsePanel.appendChild(salesforsePanelSpinner);
    }
  };

  var hideSpinner = function() {
    let salesforsePanelSpinner = document.getElementById('salesforsePanelSpinner');
    if (salesforsePanelSpinner) {
      salesforsePanelSpinner.parentNode.removeChild(salesforsePanelSpinner);
    }
  };

  var showPanelMessage = function(title, message) {
    var salesforsePanelContent = document.getElementById('salesforsePanelContent');
    if (salesforsePanelContent) {
      var panelContentMessage = document.createElement('div');
      panelContentMessage.setAttribute('id', 'salesforsePanelMessage');
      panelContentMessage.setAttribute('class', 'panel__message');
      panelContentMessage.innerHTML = `
        <div class="panel__message__title">${title}</div>
        <div class="panel__message__content">${message}</div>
      `;
      salesforsePanelContent.appendChild(panelContentMessage);
    }
  };

  var hidePanelMessage = function() {
    let salesforsePanelMessage = document.getElementById('salesforsePanelMessage');
    if (salesforsePanelMessage) {
      salesforsePanelMessage.parentNode.removeChild(salesforsePanelMessage);
    }
  };

  var getContactData = function(value) {
    SF_data = {
      contact: {},
      metadata: {},
      account: {},
      opportunity: {}
    };
    errorList = [];
    let severalContacts = false;

    chrome.runtime.sendMessage({getContact: value}, contactResponse => {   
      if (contactResponse.records && contactResponse.records.length > 0) {

        // CHECK CONTACT
        if (contactResponse.records.length == 1) {
          SF_data.contact = {...contactResponse.records[0]};
        } else if (contactResponse.records.length > 1) {
          contactResponse.records.forEach(item => {
            if (item.AccountId) {
              SF_data.contact = {...item};
              severalContacts = true;
            }
          });
        }

        // CHECK SERVICE
        let messageObject = {};
        if (currentService == 'ALLIANT') messageObject = { getMetadataAlliant: true };
        else if (currentService == 'APSYSTEMS') messageObject = { getMetadataAPSystem: true };
        else if (currentService == 'NOVAPORTAL') messageObject = { getMetadataNovaPortal: true };

        chrome.runtime.sendMessage(messageObject, metadataResponse => {
          if (metadataResponse && metadataResponse.records && metadataResponse.records.length == 1 && metadataResponse.records[0]) {
            SF_data.metadata = {...metadataResponse.records[0]};

            if (SF_data.contact && SF_data.contact.AccountId && SF_data.contact.AccountId.length > 0) {

              chrome.runtime.sendMessage({getAccount: SF_data.contact.AccountId}, accountResponse => {
                if (accountResponse && accountResponse.records && accountResponse.records.length == 1 && accountResponse.records[0]) {
                  SF_data.account = {...accountResponse.records[0]};
                  
                  chrome.runtime.sendMessage({getOpportunity: SF_data.contact.AccountId, service: currentService}, opportunityResponse => {
                    if (opportunityResponse && opportunityResponse.records && opportunityResponse.records.length == 1 && opportunityResponse.records[0]) {
                      SF_data.opportunity = {...opportunityResponse.records[0]};

                      // SEVERAL MESSAGE
                      if (severalContacts) {
                        let message = `<p>Attention, several contacts with the email were found <b>${value}</b>.</p>`;
                        contactResponse.records.forEach((item, index) => {
                          message += `<p>${index + 1}. <b>${item.FirstName} ${item.LastName}</b> <span class="additional">(id: ${item.Id})</span></p>`;
                        });
                        message += `<p>A contact's email is a key to search for contacts, and it must be unique. Since the search for Account and Opportunity depends on the contact record. Check all of the above entries and try changing the entries so that the search condition is met.</p>`;
                        message += `<p><b>${SF_data.contact.FirstName} ${SF_data.contact.LastName}</b> (${SF_data.contact.Email}) will be selected to fill out the form because it has a relationship with the account.</p>`
                        showPanelMessage('More than one record was found', message);
                      }
                      
                      showFillButton();
                      hideSpinner();
                      
                    } else {
                      let message = `<p>An unexpected error occurred, copy it and report it to the system administrator.</p>`;
                      message += `<p class="pre">${JSON.stringify(opportunityResponse)}</p>`;
                      hideSpinner();
                      showPanelMessage('Request error', message);
                    }
                  });
                  
                } else {
                  let message = `<p>An unexpected error occurred, copy it and report it to the system administrator.</p>`;
                  message += `<p class="pre">${JSON.stringify(accountResponse)}</p>`;
                  hideSpinner();
                  showPanelMessage('Request error', message);
                }
              });

            } else {
              let message = `<p>Email contact <b>${value}</b> it has no relationship to any Account record, so only the following fields can be filled in the form:</p>`;
              message += `<p>First Name - <b>${SF_data.contact.FirstName}</b></p>`;
              message += `<p>Last Name - <b>${SF_data.contact.LastName}</b></p>`;
              message += `<p>Phone - <b>${parsePhone(SF_data.contact.Phone)}</b></p>`;
              message += `<p>Also will fill the fields saved in Custom Metadata.</p>`;
              showPanelMessage('No relationship to the account record', message);
              showFillButton();
              hideSpinner();
            }

          } else {
            let message = `<p>An unexpected error occurred, copy it and report it to the system administrator.</p>`;
            message += `<p class="pre">${JSON.stringify(metadataResponse)}</p>`;
            hideSpinner();
            showPanelMessage('Request error', message);
          }
        });

      } else if (contactResponse.records && contactResponse.records.length == 0) {
        let message = `<p>Contact with email <b>${value}</b> not found, check that the email you entered is correct and try again.</p>`;
        hideSpinner();
        showPanelMessage('Record was not found', message);

      } else {
        let message = `<p>An unexpected error occurred, copy it and report it to the system administrator or try <b>updating the token</b>.</p>`;
        message += `<p class="pre">${JSON.stringify(contactResponse)}</p>`;
        hideSpinner();
        showPanelMessage('Request error', message);
      }
    });
  };

  var showErrorTable = function() {
    hideErrorTable();

    if (errorList.length > 0) {

      errorList.sort((a, b) => {
        if (+a.page > +b.page) return 1;
        if (+a.page < +b.page) return -1;
        return 0;
      });

      var salesforsePanelContent = document.getElementById('salesforsePanelContent');
      if (salesforsePanelContent) {
        var message = '<table class="panel__table">';
        message += '<tr><th>Name field</th><th>Message</th></tr>';
        errorList.forEach(item => {
          message += `<tr><td>${item.name}</td><td>${item.message}</td></tr>`;
        });
        message += '</table>';

        var panelContentErrorTable = document.createElement('div');
        panelContentErrorTable.setAttribute('id', 'panelContentErrorTable');
        panelContentErrorTable.setAttribute('class', 'panel__message');
        panelContentErrorTable.innerHTML = `
          <div class="panel__message__title">Filling errors</div>
          <div class="panel__message__content">${message}</div>
        `;
        salesforsePanelContent.appendChild(panelContentErrorTable);
      }
    }
  };

  var hideErrorTable = function() {
    let panelContentErrorTable = document.getElementById('panelContentErrorTable');
    if (panelContentErrorTable) {
      panelContentErrorTable.parentNode.removeChild(panelContentErrorTable);
    }
  };

  var showFillButton = function() {
    checkService();
    checkForm();
    if (
      (currentService == 'ALLIANT' && 0 < currentPage && currentPage <= 14) ||
      (currentService == 'APSYSTEMS' && currentPage == 1) ||
      (currentService == 'NOVAPORTAL' && currentPage == 1)
    ) {
      var salesforsePanelContent = document.getElementById('salesforsePanelContent');
      if (salesforsePanelContent) {
        var panelFillButton = document.createElement('div');
        panelFillButton.setAttribute('id', 'salesforsePanelFill');
        panelFillButton.setAttribute('class', 'panel__fill-button');
        panelFillButton.innerHTML = `
          <div class="panel__message__title">Form filling</div>
          <div class="panel__message__content"><p>Attention! To fill the page correctly, wait until the animation of the transition between the pages of the form is finished. Each page must be filled in separately by clicking on the <b>Fill in the page</b> button.</p></div>
          <button id="salesforsePanelFillButton" class="panel__email-input__button">Fill in the page</button>
        `;
        salesforsePanelContent.appendChild(panelFillButton);
      }
    } else {
      hidePanelMessage();
      showPanelMessage('Form not found', '<p>The required form was not found on the current page. Check whether you have opened the form page correctly, or try reloading the page. If you did not wait for the end of loading the desired form and clicked the search button and received the message "Form not found", then try clicking again on the "Search contact" button.</p>');
    }

    var salesforsePanelFillButton = document.getElementById('salesforsePanelFillButton');
    if (salesforsePanelFillButton) {
      salesforsePanelFillButton.addEventListener('click', () => {
        checkService();
        checkForm();

        if (currentService == 'ALLIANT' && 0 < currentPage && currentPage <= 14) {
          switch (currentPage) {
            case 1:
              fillingAlliantPage1();
              break;
            case 2:
              fillingAlliantPage2();
              break;
            case 3:
              fillingAlliantPage3();
              break;
            case 4:
              fillingAlliantPage4();
              break;
            case 5:
              fillingAlliantPage5();
              break;
            case 6:
              fillingAlliantPage6();
              break;
            case 7:
              fillingAlliantPage7();
              break;
            case 8:
              fillingAlliantPage8();
              break;
            case 9:
              fillingAlliantPage9();
              break;
            case 10:
              fillingAlliantPage10();
              break;
            case 11:
              fillingAlliantPage11();
              break;
            case 12:
              fillingAlliantPage12();
              break;
            case 13:
              fillingAlliantPage13();
              break;
            case 14:
              fillingAlliantPage14();
              break;
          }

        } else if (currentService == 'APSYSTEMS' && currentPage == 1) {
          fillingApsystemsPage1();

        } else if (currentService == 'NOVAPORTAL' && currentPage == 1) {
          fillingNovaPortalPage1();
        }
      });
    }

  };

  var hideFillButton = function() {
    let salesforsePanelFill = document.getElementById('salesforsePanelFill');
    if (salesforsePanelFill) {
      salesforsePanelFill.parentNode.removeChild(salesforsePanelFill);
    }
  };



  //
  //  FILLING FORM
  //
  var parsePhone = function(phone) {
    if (phone) {
      var result = phone.replace(/\D+/g, "");
      if (result.length === 10) {
        result = "(" + result.substring(0, 3) + ") " + result.substring(3, 6) + "-" + result.substring(6);
        return result;
      }
    } else return '';
  };

  var changeBackgroundColor = function(item, type) {
    item.classList.remove('changed-element');
    item.classList.remove('not-filled');
    if (type == 'success') item.classList.add('changed-element');
    else if (type == 'not-filled') item.classList.add('not-filled');
  };

  var simulateEvent = function(element, event) {
    var evt;
    if (document.createEvent) {
      evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, false);
    }
    evt ? element.dispatchEvent(evt) : element.click && element.click();
  };

  var addError = function(page, name, type, message) {
    errorList.push({
      page,
      name,
      type,
      message
    });
  };



  //
  //  ALLIANT
  //
  var setRadioValue = function(parentId, radioName, value, page, name, type) {
    if (!value) addError(page, name, type, 'SF field is empty');
    else {
      let parent = document.querySelector(`div[data-elementid="${parentId}"]`);
      if (parent) {
        let inputs = parent.querySelectorAll(`input[name="${radioName}"]`);
        if (inputs.length == 0) addError(page, name, type, 'Radio inputs not found');
        else if (inputs.length > 0) {
          let labels = [];
          inputs.forEach(item => {
            let id = item.getAttribute('id');
            let label = document.querySelector(`label[for="${id}"]`);
            if (label) labels.push(label);
          });
          if (labels.length == 0) addError(page, name, type, 'Radio labels not found');
          else if (labels.length > 0) {
            let id = null;
            let label = null;
            labels.forEach(item => {
              if (item.innerText == value) {
                id = item.getAttribute('for');
                label = item;
              }
            });
            if (!id || !label) addError(page, name, type, 'Radio input id\'s not found');
            else {
              let input = null;
              inputs.forEach(item => {
                if (item.getAttribute('id') == id) input = item;
              });

              if (!input) addError(page, name, type, 'Radio input not found');
              else {
                input.checked = true;
                if (!input.checked) addError(page, name, type, 'Value not set');
                else {
                  simulateEvent(input, 'change');
                  changeBackgroundColor(label, 'success');
                }
              }
            }
          }
        }
      } else addError(page, name, type, 'Form block with elements not found');
    }
  };

  var getSelectOption = function(item) {
    var result = {};
    var options = item.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value != -1) {
        let key = options[i].innerText.toLowerCase().replace('\n', '').trim();
        let value = options[i].value;
        result[key] = value;
      }
    }
    return result;
  };

  var setSelectValue = function(parentId, role, value, page, name, type) {
    if (!value) addError(page, name, type, 'SF field is empty');
    let element = null;
    let parent = document.querySelector(`div[data-elementid="${parentId}"]`);
    if (parent) {
      element = parent.querySelector(`select[data-test-role=${role}]`);
      if (!value && element) {
        changeBackgroundColor(element, 'not-filled');
      } else if (value && element) {
        let listOptions = getSelectOption(element);
        if (listOptions[value.toLowerCase()]) {
          element.value = listOptions[value.toLowerCase()];
          if (element.value == listOptions[value.toLowerCase()]) {
            simulateEvent(element, 'change');
            changeBackgroundColor(element, 'success');
          } else {
            addError(page, name, type, 'Value not set');
            changeBackgroundColor(element, 'not-filled');
          }
        } else addError(page, name, type, 'The received value is not in the options list');
      } else addError(page, name, type, 'Select element not found');
    } else addError(page, name, type, 'Form block with elements not found');
  };

  var setInputValue = function(parentId, role, value, page, name, type) {
    if (!value) addError(page, name, type, 'SF field is empty');
    let element = null;
    let parent = document.querySelector(`div[data-elementid="${parentId}"]`);
    if (parent) {
      element = parent.querySelector(`input[data-test-role=${role}]`);
      if (!value && element) {
        changeBackgroundColor(element, 'not-filled');
      } else if (value && element) {
        element.value = value;
        if (element.value == value) {
          simulateEvent(element, 'input');
          simulateEvent(element, 'change');
          changeBackgroundColor(element, 'success');
        } else {
          addError(page, name, type, 'Value not set');
          changeBackgroundColor(element, 'not-filled');
        }
      } else addError(page, name, type, 'Input element not found');
    } else addError(page, name, type, 'Form block with elements not found');
  };

  var setCounty = function(parentId, value, page, name, type) {
    if (!value) addError(page, name, type, 'SF field is empty');
    let parent = document.querySelector(`div[data-elementid="${parentId}"]`);
    if (parent) {
      let element = null;
      let labels = parent.querySelectorAll(`label`);
      labels.forEach(item => {
        if ('County'.toLowerCase() == item.innerText.replace('\n', '').trim().toLowerCase()) {
          let id = item.getAttribute('for');
          element = parent.querySelector(`select[id="${id}"]`);
        }
      });
      if (!value && element) {
        changeBackgroundColor(element, 'not-filled');
      } else if (value && element) {
        let listOptions = getSelectOption(element);
        if (listOptions[value.toLowerCase()]) {
          element.value = listOptions[value.toLowerCase()];
          if (element.value == listOptions[value.toLowerCase()]) {
            simulateEvent(element, 'change');
            changeBackgroundColor(element, 'success');
          } else {
            addError(page, name, type, 'Value not set');
            changeBackgroundColor(element, 'not-filled');
          }
        } else addError(page, name, type, 'The received value is not in the options list');
      } else addError(page, name, type, 'Select element not found');
    } else addError(page, name, type, 'Form block with elements not found');
  };

  var fillingAlliantPage1 = function () {
    let page = 1;
    errorList = [];
    setRadioValue('7SW9KJ9554YT', 'CJ3T5FC2NBNG', SF_data.metadata.Requested_Interconnection_Application__c, page, 'Requested Interconnection Application Category Size', 'radio');
    setSelectValue('EUE9ZMXWYUCR', 'dropdownlist-element', SF_data.metadata.Installation_Type__c, page, 'Installation type', 'select');
    showErrorTable();
  };

  var fillingAlliantPage2 = function () {
    let page = 2;
    errorList = [];
    setRadioValue('GRBRNYX20398', 'BJHJ3YQ8D6MX', SF_data.metadata.Is_Interconnection_Customer__c, page, 'Is the Interconnection Customer a business?', 'radio');
    setInputValue('Q9H6NJHY5G6R', 'contact-first-element', SF_data.contact.FirstName, page, 'First name', 'input');
    setInputValue('Q9H6NJHY5G6R', 'contact-last-element', SF_data.contact.LastName, page, 'Last name', 'input');
    setInputValue('Q9H6NJHY5G6R', 'contact-line1-element', SF_data.account.Mailing_Address__c, page, 'Address - Street', 'input');
    setInputValue('Q9H6NJHY5G6R', 'contact-city-element', SF_data.account.Mailing_City__c, page, 'Address - City', 'input');
    setSelectValue('Q9H6NJHY5G6R', 'state-select', SF_data.account.Mailing_State__c, page, 'Address - State', 'select');
    setInputValue('Q9H6NJHY5G6R', 'contact-zip-element', SF_data.account.Mailing_Zip_Code__c, page, 'Address - Zip Code', 'input');
    setInputValue('Q9H6NJHY5G6R', 'contact-email-element', SF_data.contact.Email, page, 'Email', 'input');
    setInputValue('Q9H6NJHY5G6R', 'contact-phone-element', parsePhone(SF_data.contact.Phone), page, 'Phone', 'input');
    setInputValue('622WR79KNH17', 'textbox-element', SF_data.metadata.Applicant_Title__c, page, 'Applicant Title', 'input');
    setInputValue('PUT1SC3QBUH7', 'textbox-element', parsePhone(SF_data.contact.Phone), page, 'Daytime Emergency Contact Numbers for Responsible Party', 'input');
    setInputValue('7BWSXX2YXEDR', 'textbox-element', parsePhone(SF_data.contact.Phone), page, 'Evening Emergency Contact Numbers for Responsible Party', 'input');
    setInputValue('VJ32SFZHVP44', 'textbox-element', parsePhone(SF_data.contact.Phone), page, 'Weekend Emergency Contact Numbers for Responsible Party', 'input');
    setInputValue('17JBPSN63DY2', 'address-line1-element', SF_data.opportunity.Project_Address__c, page, 'Location of the Generation System - Street', 'input');
    setInputValue('17JBPSN63DY2', 'address-city-element', SF_data.opportunity.Project_City__c, page, 'Location of the Generation System - City', 'input');
    setSelectValue('17JBPSN63DY2', 'state-select', SF_data.opportunity.Project_State__c, page, 'Location of the Generation System - State', 'select');
    setInputValue('17JBPSN63DY2', 'address-zip-element', SF_data.opportunity.Project_Zip_Code__c, page, 'Location of the Generation System - Zip Code', 'input');
    setTimeout(() => {
      setCounty('17JBPSN63DY2', SF_data.opportunity.County__c, page, 'County', 'select');
    }, 1000);
    setInputValue('53UPD58C0SKT', 'textbox-element', SF_data.opportunity.Electric_Service_Acct_No__c, page, 'Electric Service Account Number', 'input');
    setInputValue('JHZBNY6BHZUC', 'textbox-element', SF_data.opportunity.Meter_Number__c, page, 'Meter/Badge Number', 'input');
    setRadioValue('7E37NGM68FCU', 'H04AJG19S2SY', SF_data.metadata.Customer_Type__c, page, 'Customer Type', 'radio');
    setRadioValue('WDWWES6EM465', '8Q1FDR2VZE9B', SF_data.metadata.Applicant_s_Ownership__c, page, `Applicant's Ownership Interest in the Generation System`, 'radio');
    showErrorTable();
  };
    
  var fillingAlliantPage3 = function () {
    let page = 3;
    errorList = [];
    setRadioValue('KNX3Q20KY4NB', 'CSFW8X941QHF', SF_data.metadata.Primary_Intent__c, page, `Primary Intent of the Generation System`, 'radio');
    setInputValue('XG6M1XB4GKWZ', 'textbox-element', SF_data.opportunity.Estimated_Current_Usage_kWh__c, page, 'Anticipated annual Electricity Consumption of the facility or site: (kWh/Yr)', 'input');
    setInputValue('76YC2DUEQGR7', 'textbox-element', SF_data.opportunity.X1st_Year_Estimated_Production__c, page, 'Anticipated annual Electricity Production of the generation system: (kWh/Yr)', 'input');
    let value = null;
    if (SF_data.opportunity.Estimated_Current_Usage_kWh__c && SF_data.opportunity.X1st_Year_Estimated_Production__c) {
      value = SF_data.opportunity.Estimated_Current_Usage_kWh__c - SF_data.opportunity.X1st_Year_Estimated_Production__c;
    }
    setInputValue('GFCYMBJ31G9K', 'textbox-element', value, page, 'Anticipated annual Electricity Purchases (consumption minus production): (kWh/Yr)', 'input');
    showErrorTable();
  };
  
  var fillingAlliantPage4 = function () {
    let page = 4;
    errorList = [];
    setSelectValue('A5QX5RENSKZU', 'same-as-choice', SF_data.metadata.Installing_Contractor__c, page, 'Installing Contractor Information', 'select');
    setInputValue('A5QX5RENSKZU', 'contact-first-element', SF_data.metadata.IC_First_Name__c, page, 'First name', 'input');
    setInputValue('A5QX5RENSKZU', 'contact-last-element', SF_data.metadata.IC_Last_Name__c, page, 'Last name', 'input');
    setInputValue('A5QX5RENSKZU', 'contact-company-element', SF_data.metadata.IC_Company__c, page, 'Company', 'input');
    setInputValue('A5QX5RENSKZU', 'contact-line1-element', SF_data.metadata.IC_Street__c, page, 'Address - Street', 'input');
    setInputValue('A5QX5RENSKZU', 'contact-city-element', SF_data.metadata.IC_City__c, page, 'Address - City', 'input');
    setSelectValue('A5QX5RENSKZU', 'state-select', SF_data.metadata.IC_State__c, page, 'Address - State', 'select');
    setInputValue('A5QX5RENSKZU', 'contact-zip-element', SF_data.metadata.IC_Zip_Code__c, page, 'Address - Zip Code', 'input');
    setInputValue('A5QX5RENSKZU', 'contact-email-element', SF_data.metadata.IC_Email__c, page, 'Email', 'input');
    setInputValue('A5QX5RENSKZU', 'contact-phone-element', parsePhone(SF_data.metadata.IC_Phone__c), page, 'Phone', 'input');
    showErrorTable();
  };

  var fillingAlliantPage5 = function () {
    let page = 5;
    errorList = [];
    setRadioValue('UE1CNWZBAGHW', 'KWWNFKHED57J', SF_data.metadata.Extended_Project__c, page, `Is this project an expansion of an active existing distributed generation facility?`, 'radio');
    setRadioValue('EUAM3F7E3P0W', '7C1TTS8DGG19', SF_data.metadata.Energy_Source__c, page, `Primary/Prime Mover Energy Source (New)`, 'radio');
    setRadioValue('NA8NC9XXF4E7', 'UWTNTD0VRU3D', SF_data.metadata.Generation_Type__c, page, `Generation Type`, 'radio');
    setSelectValue('ZPG2URDUX6EA', 'dropdownlist-element', SF_data.metadata.Is_Additional_New_Energy__c, page, 'Is there an Additional New Energy Source? Or Battery/Storage?', 'select');
    showErrorTable();
  };

  var fillingAlliantPage6 = function () {
    let page = 6;
    errorList = [];
    setInputValue('Z6T8X9JS288Z', 'textbox-element', SF_data.opportunity.AC_System_Size__c, page, 'Combined Total kW of All New Inverters: Generating Facility Nameplate Rating (kW-AC) ', 'input');
    setInputValue('3AXHJN039TN0', 'textbox-element', SF_data.opportunity.AC_System_Size__c, page, 'Combined Total kVA of All New Inverters: Generating Facility Nameplate Rating (kVA-AC)', 'input');
    showErrorTable();
  };

  var fillingAlliantPage7 = function () {
    let page = 7;
    errorList = [];
    setInputValue('H9UW8N5JQTTG', 'textbox-element', SF_data.opportunity.Inverter_Manufacturer__c, page, 'Manufacturer: Generator/Inverter', 'input');
    setInputValue('VTF72RQBA2VA', 'textbox-element', SF_data.opportunity.Inverter_Name__c, page, 'Model : Generator/Inverter', 'input');
    setInputValue('QFGXAHUZJ042', 'textbox-element', SF_data.metadata.Version_No_Generator_Inverter__c, page, 'Version No.: Generator/Inverter', 'input');
    setInputValue('76FBDRXDV70C', 'textbox-element', SF_data.metadata.Serial_No_Generator_Inverter__c, page, 'Serial No.: Generator/Inverter', 'input');
    setRadioValue('6CT67YJQYP1S', 'FW7X4GGAH9GZ', SF_data.metadata.Generation_Type_Phases__c, page, `Generation Type - Phases`, 'radio');
    setInputValue('9P69TA5WGGWZ', 'textbox-element', SF_data.metadata.Nameplate_Rating_kW__c, page, 'Nameplate Rating (kW) AC: Generator/Inverter', 'input');
    setInputValue('4D4U7FHVBE6C', 'textbox-element', SF_data.metadata.Nameplate_Rating_kVA__c, page, 'Nameplate Rating (kVA): Generator/Inverter', 'input');
    setInputValue('6GF9HDJWF87J', 'textbox-element', SF_data.metadata.Generator_Inverter_Rated_Voltage__c, page, 'Generator/Inverter Rated Voltage', 'input');
    setInputValue('Q7JPWW6HU4J3', 'textbox-element', SF_data.opportunity.Inverter_Quantity__c, page, 'Number of Generators/Inverters', 'input');
    setTimeout(() => {
      setSelectValue('K8MX70XZ4ND7', 'dropdownlist-element', SF_data.metadata.Are_Additional_Inverters__c, page, 'Are there Additional Existing Inverters?', 'select');
    }, 1000);
    showErrorTable();
  };

  var fillingAlliantPage8 = function () {};
  var fillingAlliantPage9 = function () {};

  var fillingAlliantPage10 = function () {
    let page = 10;
    errorList = [];
    setSelectValue('CT170H5MHUJE', 'dropdownlist-element', SF_data.metadata.Transformer_Be_Installed__c, page, 'Will a dedicated transformer be installed', 'select');
    showErrorTable();
  };

  var fillingAlliantPage11 = function () {
    let page = 11;
    errorList = [];
    setInputValue('5457UDB9CURW', 'textbox-element', SF_data.opportunity.Carrier__c, page, 'Carrier', 'input');
    setInputValue('4AV0CZ0MABYY', 'textbox-element', SF_data.opportunity.Agent_Name__c, page, 'Agent Name', 'input');
    setInputValue('R5R0JK20CGM4', 'textbox-element', parsePhone(SF_data.opportunity.Phone_Number__c), page, 'Phone Number', 'input');
    setInputValue('CBHKHS7VJ923', 'textbox-element', SF_data.opportunity.PolicyLiabilityLimit__c, page, 'Policy Liability Limit', 'input');
    showErrorTable();
  };

  var fillingAlliantPage12 = function () {
    let page = 12;
    errorList = [];
    setRadioValue('NE17KRVEQ2RA', '8KB46DBKUX7T', SF_data.metadata.Certification_Of_Equipment__c, page, `Has the proposed distributed generation paralleling equipment been certified?`, 'radio');
    setRadioValue('FMKSVJKRPHX0', 'BBTM1AGKMM1A', SF_data.metadata.If_Not_Certified__c, page, `If not certified, does the proposed distributed generator meet the operating limits defined in Wis. Admin. Code chapter PSC 119?`, 'radio');
    showErrorTable();
  };

  var fillingAlliantPage13 = function () {};
  var fillingAlliantPage14 = function () {};



  //
  //  AP SYSTEMA 
  //
  var setAPSUserType = function(parentId, radioName, value, page, name, type) {
    if (!value) addError(page, name, type, 'SF field is empty');
    else {
      let iframe = document.getElementById('configuration_body');
      if (iframe) {
        let parent = iframe.contentWindow.document.querySelector(`div[id="${parentId}"]`);
        if (parent) {
          let inputs = parent.querySelectorAll(`input[name="${radioName}"]`);
          if (inputs.length == 0) addError(page, name, type, 'Radio inputs not found');
          else if (inputs.length > 0) {
            let labels = [];
            inputs.forEach(item => {
              let id = item.getAttribute('id');
              let label = iframe.contentWindow.document.querySelector(`label[for="${id}"]`);
              if (label) labels.push(label);
            });
            if (labels.length == 0) addError(page, name, type, 'Radio labels not found');
            else if (labels.length > 0) {
              let id = null;
              let label = null;
              labels.forEach(item => {
                if (item.innerText == value) {
                  id = item.getAttribute('for');
                  label = item;
                }
              });
              if (!id || !label) addError(page, name, type, 'Radio input id\'s not found');
              else {
                let input = null;
                inputs.forEach(item => {
                  if (item.getAttribute('id') == id) input = item;
                });
  
                if (!input) addError(page, name, type, 'Radio input not found');
                else {
                  input.checked = true;
                  if (!input.checked) addError(page, name, type, 'Value not set');
                  else {
                    simulateEvent(input, 'change');
                    simulateEvent(input, "click");
                    changeBackgroundColor(label, 'success');
                  }
                }
              }
            }
          }
        } else addError(page, name, type, 'Form block with elements not found');
      } else addError(page, name, type, 'Frame with elements not found');
    }
  }

  var setAPSInputValue = function(id, value, page, name, type, index) {
    if (!value) addError(page, name, type, 'SF field is empty');
    // let iframe = document.getElementById('configuration_body');
    // if (iframe) {
      let element = document.querySelectorAll(`input[${id}]`)[index];
      if (!value && element) {
        element.value = '';
        changeBackgroundColor(element, 'not-filled');
      } else if (value && element) {
        element.value = value;
        if (element.value == value) {
          simulateEvent(element, 'input');
          simulateEvent(element, 'change');
          simulateEvent(element, "keyup");
          simulateEvent(element, "blur");
          changeBackgroundColor(element, 'success');
        } else {
          addError(page, name, type, 'Value not set');
          changeBackgroundColor(element, 'not-filled');
        }
      } else addError(page, name, type, 'Input element not found');
    // } else addError(page, name, type, 'Frame with elements not found');
  };

  var setAPSSelectValue = function(id, backId, value, page, name, type, index) {
    if (!value) addError(page, name, type, 'SF field is empty');
    let element = null;
    
    // if (iframe) {
      element = document.querySelectorAll(`select[${id}]`)[index];
      if (!value && element) {
        changeBackgroundColor(element, 'not-filled');
        // changeBackgroundColor(iframe.contentWindow.document.querySelector(`div[id=${backId}]`), 'not-filled');
      } else if (value && element) {
        let listOptions = getSelectOption(element);
        if (listOptions[value.toLowerCase()]) {
          element.value = listOptions[value.toLowerCase()];
          if (element.value == listOptions[value.toLowerCase()]) {
            simulateEvent(element, 'change');
            simulateEvent(element, 'keyup');
            simulateEvent(element, 'blur');
            changeBackgroundColor(element, 'success');
            // changeBackgroundColor(iframe.contentWindow.document.querySelector(`div[id=${backId}]`), 'success');
          } else {
            addError(page, name, type, 'Value not set');
            changeBackgroundColor(element, 'not-filled');
            // changeBackgroundColor(iframe.contentWindow.document.querySelector(`div[id=${backId}]`), 'not-filled');
          }
        } else addError(page, name, type, 'The received value is not in the options list');
      } else addError(page, name, type, 'Select element not found');
    // } else addError(page, name, type, 'Frame with elements not found');
  };

  var setAPSSelectState = function(id, backId, value, page, name, type, index) {
    if (!value) addError(page, name, type, 'SF field is empty');
    let element = null;
    
    // if (iframe) {
      element = document.querySelectorAll(`select[${id}]`)[index];
      if (!value && element) {
        changeBackgroundColor(element, 'not-filled');
        // changeBackgroundColor(iframe.contentWindow.document.querySelector(`div[id=${backId}]`), 'not-filled');
      } else if (value && element) {
        let listOptions = getSelectOption(element);
        let flag = false;
        for (let key in listOptions) {
          if (listOptions[key].toLowerCase() == value.toLowerCase()) flag = true;
        }
        if (flag) {
          element.value = value;
          if (element.value == value) {
            simulateEvent(element, 'change');
            simulateEvent(element, 'keyup');
            simulateEvent(element, 'blur');
            changeBackgroundColor(element, 'success');
            // changeBackgroundColor(iframe.contentWindow.document.querySelector(`div[id=${backId}]`), 'success');
          } else {
            addError(page, name, type, 'Value not set');
            changeBackgroundColor(element, 'not-filled');
            // changeBackgroundColor(iframe.contentWindow.document.querySelector(`div[id=${backId}]`), 'not-filled');
          }
        } else addError(page, name, type, 'The received value is not in the options list');
      } else addError(page, name, type, 'Select element not found');
    // } else addError(page, name, type, 'Frame with elements not found');
  };

  var fillingApsystemsPage1 = function () {
    let page = 1;
    errorList = [];

    // setAPSUserType('omzone', 'abc', SF_data.metadata.User_Type__c, page, 'User Type', 'radio');

    setAPSInputValue('data-v-2e1b342b', SF_data.contact.Email, page, 'User Name', 'input', 0);

    setAPSInputValue('data-v-2e1b342b', SF_data.metadata.Password__c, page, 'Password', 'input', 1);
    setAPSInputValue('data-v-2e1b342b', SF_data.metadata.Password__c, page, 'Confirm Password', 'input', 2);
    setAPSInputValue('data-v-2e1b342b', SF_data.contact.FirstName, page, 'First Name', 'input', 3);
    setAPSInputValue('data-v-2e1b342b', SF_data.contact.LastName, page, 'Last Name', 'input', 4);
    setAPSInputValue('data-v-2e1b342b', SF_data.contact.Email, page, 'Email', 'input', 5);
    setAPSInputValue('data-v-2e1b342b', parsePhone(SF_data.contact.Phone), page, 'Phone', 'input', 6);
    setAPSSelectValue('data-v-3dffe57e', 'uniform-association', SF_data.metadata.Partner__c, page, 'Partner', 'select', 1);
    setAPSSelectValue('data-v-3dffe57e', 'uniform-Company', SF_data.metadata.Installer__c, page, 'Installer', 'select', 0);
    setAPSSelectValue('data-v-3dffe57e', 'uniform-Country', SF_data.metadata.Country__c, page, 'Country', 'select', 2);

    setAPSSelectState('data-v-3dffe57e', 'uniform-StateCode', SF_data.opportunity.Project_State__c, page, 'State/Province', 'select', 3);

    setAPSInputValue('data-v-2e1b342b', SF_data.opportunity.Project_City__c, page, 'City', 'input', 7);
    setAPSInputValue('data-v-2e1b342b', SF_data.opportunity.Project_Address__c, page, 'Address', 'input', 8);
    setAPSInputValue('data-v-2e1b342b', SF_data.opportunity.Project_Zip_Code__c, page, 'Postal Code', 'input', 9);
    setAPSInputValue('data-v-2e1b342b', SF_data.opportunity.AC_System_Size__c, page, 'System Size', 'input', 10);
    // setAPSInputValue('Inverter_type', SF_data.opportunity.Inverter_Manufacturer__c, page, 'Inverter Type', 'input');
    setAPSInputValue('data-v-2e1b342b', SF_data.opportunity.Panel_Name__c, page, 'Module Type', 'input', 11);
    setAPSInputValue('data-v-2e1b342b', SF_data.metadata.PMax__c, page, 'PMax', 'input', 12);
    // setAPSSelectValue('Grid_type', 'uniform-Grid_type', SF_data.metadata.Grid_Type__c, page, 'Grid Type', 'select');

    //gridtype
    let grids = document.getElementsByClassName("select-pop-area select-pop-area-bottom")[0].children;
    for(let grid in grids){
      if(grid.innerHTML === SF_data.metadata.Grid_Type__c){
        grid.click();
      }
    }

    showErrorTable();
  };



  //
  //  NOVA PORTAL
  //
  var setNovaPortalAgentOrHolder = function(page, name, value, type) {
    if (!value) addError(page, name, type, 'SF field is empty');
    else {
      let id = '';
      if (value == 'Application Agent') id = 'appType2';
      else if (value == 'Account Holder') id = 'appType1';

      if (id) {
        let radio = document.getElementById(id);
        if (radio) {

          radio.checked = true;
          if (!radio.checked) addError(page, name, type, 'Value not set');
          else {
            simulateEvent(radio, 'click');
          }
  
        } else addError(page, name, type, 'Radio input not found');
      } else addError(page, name, type, 'Radio input id\'s not found');
    }
  };

  var setNovaPortalInputValue = function(page, name, id, value, type) {
    if (!value) addError(page, name, type, 'SF field is empty');
    let element = document.getElementById(id);
    if (!value && element) {
      element.value = '';
      changeBackgroundColor(element, 'not-filled');

    } else if (value && element) {
      value = value.trim();
      element.value = value;
      if (element.value == value) {
        simulateEvent(element, 'input');
        changeBackgroundColor(element, 'success');
      } else {
        addError(page, name, type, 'Value not set');
        changeBackgroundColor(element, 'not-filled');
      }
    } else addError(page, name, type, 'Input element not found');
  };

  var fillingNovaPortalPage1 = function () {
    let page = 1;
    errorList = [];

    setNovaPortalAgentOrHolder(page, 'Are you the Application Agent or Account Holder?', SF_data.metadata.Agent_Or_Holder__c, 'radio');

    setNovaPortalInputValue(page, 'Agent Company Name', 'AgentCompanyName', SF_data.metadata.Agent_Company_Name__c, 'input');
    setNovaPortalInputValue(page, `Contact Person's Name`, 'AgentContactName', SF_data.metadata.Contact_Persons_Name__c, 'input');
    setNovaPortalInputValue(page, `Contact Phone Number`, 'AgentContactPhone', parsePhone(SF_data.metadata.Contact_Phone_Number__c), 'input');
    setNovaPortalInputValue(page, `Contact Email Address`, 'AgentContactEmail', SF_data.metadata.Contact_Email_Address__c, 'input');
    setNovaPortalInputValue(page, `Account Number`, 'AccountNumber', SF_data.opportunity.Electric_Service_Acct_No__c), 'input';
    setNovaPortalInputValue(page, `Meter Number`, 'AccountMeterNumber', SF_data.opportunity.Meter_Number__c, 'input');

    // Name on the Account
    let name = SF_data.contact.FirstName || '';
    name = name ? name + ' ' + SF_data.contact.LastName : SF_data.contact.LastName;
    setNovaPortalInputValue(page, `Name on the Account`, 'AccountName', name, 'input');

    setNovaPortalInputValue(page, `Best Phone Number to reach Account Holder`, 'userPhone', parsePhone(SF_data.contact.Phone), 'input');
    setNovaPortalInputValue(page, `Address Line 1`, 'AccountMailLine1', SF_data.opportunity.Project_Address__c, 'input');
    setNovaPortalInputValue(page, `City`, 'AccountMailCity', SF_data.opportunity.Project_City__c, 'input');
    setNovaPortalInputValue(page, `State`, 'AccountMailState', SF_data.opportunity.Project_State__c, 'input');
    setNovaPortalInputValue(page, `Zip`, 'AccountMailZip', SF_data.opportunity.Project_Zip_Code__c, 'input');
    showErrorTable();
  };



  chrome.storage.sync.get(["ELS_isLogin"], data => {
    if (data.ELS_isLogin) {
      addSalesforseButton();
      addSalesforsePanel();
      addPanelEmailInput();
    }
  });
};
