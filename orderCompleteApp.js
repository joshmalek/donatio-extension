window.addEventListener("load", function () {
  let receipt_id = localStorage.getItem("donation_reciept");
  let user_data = JSON.parse(localStorage.getItem("donator_info"));
  console.log(`Reciept id: ${receipt_id}`);

  localStorage.removeItem("donation_reciept");
  if (receipt_id) {
    chrome.runtime.sendMessage(
      { receipt_id, user_data, type: "process_donation" },
      function (response) {
        console.log(`Message Response:`);
        console.log(response);
      }
    );
  } else {
    console.log("Receipt id is empty.");
  }
});
