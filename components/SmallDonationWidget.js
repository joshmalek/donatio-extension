import React from 'react'
import ReactDOM from 'react-dom'

export default class SmallDonationWidget extends React.Component {

  constructor(props) {
    super(props)

    this.sliderRef = React.createRef ()
    window.donatio_global.attachComponent(this)
  }

  getContributionValue () {
    let subtotal = window.donatio_global.getSubtotal()
    let ratio = window.donatio_global.getDonationRatio()
    if (subtotal == null) return '0.00'
    else return `${subtotal.symbol} ${(subtotal.floatValue * ratio ).toFixed(2)}`
  }

  processTransaction () {
    // trigger message in background script to call the code below to open popup in a
    // new tab and show the donation progress!
    //
    // chrome.tabs.create({url: $(this).attr('href')});
  }

  setRatio (e) {
    window.donatio_global.setDonationRatio(parseInt(e.target.value)/100)
    .then(() => this.forceUpdate ())
  }

  render() {
    return (<React.Fragment>
      <div className={`donatio-selector ${window.donatio_global.donationActive() ? 'active' : ''}`}>
        <div onClick={() => {
          window.donatio_global.toggleDonationActive ()
          .then(() => {
            this.forceUpdate ()
          })
        }}>
          <div className="donatio-title"> <img width="20px" src="https://i.imgur.com/e7YTpqd.png" /> DonatIO</div>
          <div className="donatio-donation-prompt">Click me to donate to charity with your checkout.</div>
        </div>
        {window.donatio_global.donationActive () && <div>
          <div className="slider-area">
            <div className="slider-left-label">5%</div>
            <div className="slider-widget">
              <input onChange={(e) => { this.setRatio(e) }} ref={this.sliderRef} type="range" min="5" max="100" />
            </div>
            <div className="slider-right-label">100%</div>
          </div>

          <div className="price-to-donate">+{ this.getContributionValue() }</div>
          <div className="charity-of-day-area">
          <div class="label">Charity of the Day</div>
            <div class="name">{ window.donatio_global.getCharityName () }</div>
          </div>
        </div>}
      </div>
      <button onClick={() => { this.processTransaction () }} style={{marginBottom: '40px'}}>Sample Complete Order</button>
    </React.Fragment>)
  }
}
