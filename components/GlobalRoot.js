import React from 'react'
import ReactDOM from 'react-dom'
import priceParser from 'price-parser'
import axios from 'axios'

export default class GlobalRoot extends React.Component {

  constructor (props) {
    super(props)

    window.donatio_global = this

    this.state = {
      donation_active: false,
      checkout_price: null,
      donation_ratio: 0,
      subcomponents: [],
      charity_of_day: null
    }
  }

  componentDidMount () {
    // load the charity of the day
    this.getNPOofDay ()
  }

  getNPOofDay () {
    axios.post('http://localhost:4000/graphql', {
      'query': '{ NPOofDay { name, _id } }'
    })
    .then(res => {
      console.log(`Getting Charity of Day`)
      this.setState({ charity_of_day: res.data.data.NPOofDay }, () => {
        this.updateComponents ()
      })
    })
    .catch(err => {
      console.log(`Error getting charity of day`)
      console.log(err)
    })
  }

  getCharityName () {
    if (this.state.charity_of_day == null) return "<none>"
    return this.state.charity_of_day.name
  }

  getCharityId () {

    if (this.state.charity_of_day == null) return "<none>"
    return this.state.charity_of_day._id
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

  getDonationTotal () {
    let subtotal = this.state.checkout_price
    if (subtotal == null) return 0

    return {
      value: this.state.checkout_price.floatValue * this.state.donation_ratio,
      symbol: this.state.checkout_price.symbol,
      currencyCode: this.state.checkout_price.currencyCode
    }
  }

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
