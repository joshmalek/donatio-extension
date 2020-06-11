import React from 'react'
import ReactDOM from 'react-dom'

import GlobalRoot from './components/GlobalRoot'
import SmallDonationWidget from './components/SmallDonationWidget'

import './src/css/style.css'

window.addEventListener('load', function() {

  // (1) insert the global component that handles the main state
  let donatio_root_container = document.createElement('span')
  document.getElementsByTagName('body')[0].append(donatio_root_container)
  ReactDOM.render(<GlobalRoot />, donatio_root_container)

  const watch = document.getElementById('subtotals')
  const target = watch.querySelector('div.a-box-inner')
  if (target) {
    app(null, target)
  }
  else {
    // if the target isn't present automatically on load, then we create a MutationObserver
    // to monitor changes so we can find the element wa want once it loads.
    const observer = new MutationObserver((mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          const target = watch.querySelector('div.a-box-inner')
          if (target) {
            app(observer, target)
          }
        }
      }
    })

    observer.observe(watch, {
      childList: true
    })
  }

}) // end addEventListener

const app = (observer, target) => {
  if (observer) observer.disconnect ()

  if (!document.getElementById('donatio-donation-widget')) {
    const parent = target
    const root = document.createElement('div')
    root.setAttribute('id', 'donatio-donation-widget')

    parent.prepend(root)
    ReactDOM.render(<SmallDonationWidget />, document.getElementById('donatio-donation-widget'))
  }
}
