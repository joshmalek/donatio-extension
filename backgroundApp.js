import React from 'react'
import ReactDOM from 'react-dom'

import BackgroundAppContainer from './components/background/BackgroundAppContainer.js'

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request)

    if (request.type == 'process_donation') {
      console.log(`Processing donation.`)
      loadDonationProcessView ()
    }
    // sendResponse({farewell: "goodbye"});
});


const loadDonationProcessView = () => {
  let app_location = document.getElementById('background-app-container')
  if (!app_location) { console.error(`Object #background-app-container could not be found...`); return; }

  ReactDOM.render(<BackgroundAppContainer />, app_location)
}
