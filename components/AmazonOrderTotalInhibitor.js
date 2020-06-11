import React from 'react'
import ReactDOM from 'react-dom'

// previous.nextSibling.nextSibling

export default class AmazonOrderTotalInhibitor extends React.Component {

  constructor(props) {
    super(props)

    window.donatio_global.attachComponent(this)
  }

  showSubtotal () {
    let subtotal = window.donatio_global.getSubtotal ()
    let ratio = window.donatio_global.getDonationRatio ()
    if (subtotal == null || !window.donatio_global.donationActive()) return this.props.defaultSubtotal
    return `${subtotal.symbol}${(subtotal.floatValue + (subtotal.floatValue * ratio)).toFixed(2)}`
  }

  showCharityTotal () {
    let subtotal = window.donatio_global.getSubtotal ()
    let ratio = window.donatio_global.getDonationRatio ()
    if (subtotal == null) return this.props.defaultSubtotal
    return `${subtotal.symbol}${(subtotal.floatValue * ratio).toFixed(2)}`
  }

  render () {
    return (
      <React.Fragment>
        {window.donatio_global.donationActive () && <div><div className="left-mimic-cell">Charity donation:</div><div className="right-mimic-cell">{ this.showCharityTotal () }</div></div>}
        <div>
          <div className={`a-color-price a-size-medium a-text-bold left-mimic-cell ${window.donatio_global.donationActive() ? 'active-donation-text' : ''}`}>Order total:</div>
          <div className={`right-mimic-cell a-color-price a-size-medium a-text-right grand-total-price aok-nowrap a-text-bold a-nowrap right-cell  ${window.donatio_global.donationActive() ? 'active-donation-text' : ''}`}>{ this.showSubtotal () }</div>
        </div>
      </React.Fragment>
      )
  }
}

// <tr>
//   <td>Charity Donation</td>
//   <td className="">X.XX</td>
// </tr>
// <tr>
//   <td className="a-color-price a-size-medium a-text-bold">Order total:</td>
//   <td className="a-color-price a-size-medium a-text-right grand-total-price aok-nowrap a-text-bold a-nowrap right-cell">
//   $XXX.XX</td>
// </tr>
