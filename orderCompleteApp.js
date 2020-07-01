window.addEventListener("load", function () {
  let reciept_id = localStorage.getItem("donation_reciept");
  localStorage.removeItem("donation_reciept");
  if (reciept_id) {
    chrome.runtime.sendMessage(
      { reciept_id, type: "process_donation" },
      function (response) {
        console.log(`Message Response:`);
        console.log(response);
      }
    );
  } else {
    console.log("Reciept id is empty.");
  }
});
