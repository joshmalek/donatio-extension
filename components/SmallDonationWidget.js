import React from 'react'
import ReactDOM from 'react-dom'

export default class SmallDonationWidget extends React.Component {

  constructor(props) {
    super(props)

    this.sliderRef = React.createRef ()
  }

  getContributionValue () {
    let subtotal = window.donatio_global.getSubtotal()
    let ratio = window.donatio_global.getDonationRatio()
    if (subtotal == null) return '0.00'
    else return `${subtotal.symbol} ${(subtotal.floatValue * ratio ).toFixed(2)}`
  }

  setRatio (e) {
    window.donatio_global.setDonationRatio(parseInt(e.target.value)/100)
    .then(() => this.forceUpdate ())
  }

  render() {
    return (<div className={`donatio-selector ${window.donatio_global.donationActive() ? 'active' : ''}`}>
    <div onClick={() => {
      window.donatio_global.toggleDonationActive ()
      .then(() => {
        this.forceUpdate ()
      })
    }}>
      <div className="donatio-title">DonatIO</div>
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
    </div>}
  </div>)
  }
}
