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
