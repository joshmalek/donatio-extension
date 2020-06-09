//https://www.amazon.com/gp/buy/spc/handlers
alert("This is an amazon checkout!")

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);
      alert(firstHref);
    }
  }
);
