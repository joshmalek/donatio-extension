chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostEquals: 'www.amazon.com',
          schemes: ['https', 'http'],
          pathContains: 'gp/buy/spc/handlers'
        },
      })],
      actions: [
        new chrome.declarativeContent.RequestContentScript({
          js: ['app.js']
        })
      ]
    }]);
  });
});

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});

// Processing transaction requests
let process_transaction_page = `chrome-extension://${window.location.hostname}/background.html`
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    console.log(request)
    // Open the popup in a new tab.
    // console.log(window.location.href)
    console.log(`Opening ${process_transaction_page} in new tab.`)
    // chrome.tabs.create({url: window.location.href});
    chrome.tabs.create({url: process_transaction_page})
});
