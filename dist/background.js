chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules(
      [
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {
                urlContains: "donatio-site.herokuapp",
                schemes: ["https", "http"],
                // pathContains: "paymentStatus",
              },
            }),
          ],
          actions: [
            new chrome.declarativeContent.RequestContentScript({
              js: ["orderCompleteApp.js"],
            }),
          ],
        },
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {
                hostEquals: "www.amazon.com",
                schemes: ["https", "http"],
                pathContains: "gp/buy/spc/handlers",
              },
            }),
          ],
          actions: [
            new chrome.declarativeContent.RequestContentScript({
              js: ["app.js"],
            }),
          ],
        },
      ],
      (rules_) => {
        console.log(`Registered Rules`);
        console.log(rules_);
      }
    );
  });
});

chrome.commands.onCommand.addListener(function (command) {
  console.log("Command:", command);
});

// Processing transaction requests
let process_transaction_page = `chrome-extension://${window.location.hostname}/background.html`;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  // Open the popup in a new tab.
  // console.log(window.location.href)
  console.log(`Opening ${process_transaction_page} in new tab.`);
  chrome.tabs.create({ url: process_transaction_page }, (tab) => {
    // send message to the tab that was just opened
    chrome.tabs.onUpdated.addListener(function (tabId, info) {
      if (tabId == tab.id && info.status == "complete") {
        console.log(`Sending the message!`);
        chrome.tabs.sendMessage(tab.id, request, function (response) {
          // console.log(response);
        });
      }
    });
  });
});
