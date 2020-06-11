import React from 'react'
import ReactDOM from 'react-dom'
import priceParser from 'price-parser'

export default class GlobalRoot extends React.Component {

  constructor (props) {
    super(props)

    window.donatio_global = this

    this.state = {
      donation_active: false,
      checkout_price: null,
      donation_ratio: 0,
      subcomponents: []
    }
  }

  updateComponents () {
    this.state.subcomponents.forEach(subcomponent_ => {
      console.log(`Force updating...`)
      subcomponent_.forceUpdate ()
    })
  }

  attachComponent (component_) {
    let subcomponents = this.state.subcomponents.splice(0)
    subcomponents.push(component_)
    this.setState({ subcomponents: subcomponents }, () => {})
  }

  setDonationRatio (ratio) {
    return new Promise( (resolve, reject) => {
      this.setState({donation_ratio: ratio}, () => { this.forceUpdate(); this.updateComponents(); resolve(null); })
    })
  }

  getDonationRatio () {
    return this.state.donation_ratio
  }

  parseSubtotal (subtotal_value) {

    let subtotal = priceParser.parseFirst(subtotal_value)
    this.setState({ checkout_price: subtotal }, () => { this.forceUpdate () })
  }

  getSubtotal () { return this.state.checkout_price }

  toggleDonationActive () {
    return new Promise( (resolve, reject) => {

      this.setState({ donation_active: !this.state.donation_active },
        () => { this.updateComponents(); resolve(null); }
      )

    })
  }

  donationActive () {
    return this.state.donation_active
  }

  render () {
    return (<div></div>)
  }

}
