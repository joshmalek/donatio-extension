window.addEventListener("load", function () {
  let reciept_id = localStorage.getItem("donation_reciept");
  let user_data = JSON.parse(localStorage.getItem("donator_info"));

  localStorage.removeItem("donation_reciept");
  if (reciept_id) {
    chrome.runtime.sendMessage(
      { reciept_id, user_data, type: "process_donation" },
      function (response) {
        console.log(`Message Response:`);
        console.log(response);
      }
    );
  } else {
    console.log("Reciept id is empty.");
  }
});
