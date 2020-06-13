import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar'
import axios from 'axios'
import lottie from 'lottie-web'

import Lottie_InProcess from '../../src/lottie-files/18176-card-payment-in-process.json'
import Lottie_PaymentSuccess from '../../src/lottie-files/16271-payment-successful.json'

export default class BackgroundAppContainer extends React.Component {

  constructor(props) {
    super(props)

    console.log(`In BackgroundAppContainer Constructor`)
    console.log(this.props.donation_info)

    this.lottiePendingContainer = React.createRef ()
    this.lottieSuccessContainer = React.createRef ()

    this.state = {
      current_user: null,
      transaction_state: '<pending>'
    }
  }

  componentDidMount () {
    this.getCurrentUser ()
    this.processTransaction ()
    this.loadLottie ()
  }

  componentDidUpdate () {
    this.loadLottie ()
  }

  loadLottie () {
    // load lottie
    let lottie_files = {
      in_process: Lottie_InProcess,
      success: Lottie_PaymentSuccess
    }
    let lottie_file = lottie_files.in_process // default
    let options = {}
    if (this.state.transaction_state == '<pending>') {
      lottie_file = lottie_files.in_process
      options.loop = true
      options.autoplay = true
      options.container = this.lottiePendingContainer.current
    }
    else if (this.state.transaction_state == '<success>') {
      lottie_file = lottie_files.success
      options.loop = false
      options.autoplay = true
      options.container = this.lottieSuccessContainer.current
    }

    lottie.loadAnimation({
      container: options.container,
      renderer: 'svg',
      loop: options.loop ? options.loop : false,
      autoplay: options.autoplay ? options.autoplay : false,
      animationData: lottie_file
    })
  }

  processTransaction () {

    let process_query = `mutation { processDonation(user_id: "5ee2a62b9bd5ef93fc546c02", donation_amount: ${this.props.donation_info.transaction_amount.value}, currency_code: "${this.props.donation_info.transaction_amount.currencyCode}") { previous_experience_value, experience_gained, total_donation, medals_unlocked { _id, name, description, img_url}} }`
    console.log(`Query String: ${process_query}`)

    axios.post('http://localhost:4000/graphql', {
      'query': process_query
    })
    .then(res => {
      console.log(`Processing transaction ...`)
      console.log(res)

      // update transaction state
      this.setState({
        transaction_state: '<success>'
      }, () => {
        console.log(`Transaction successful.`)
        console.log(this.state.transaction_state)
      })
    })
    .catch(err => {
      console.log(`Error processing transaction...`)
      console.log(err)
    })
  }

  getCurrentUser () {
    axios.post('http://localhost:4000/graphql', {
      'query': `{ user(_id: "5ee2a62b9bd5ef93fc546c02") { firstName, lastName, experience, medals { name } } }`
    })
    .then (res => {
      console.log(res)
      this.setState({current_user: res.data.data.user })
    })
    .catch (err => {
      console.log(`Error getting current user`)
      console.log(err)
    })
  }

  render () {
    return (<div className="background-container">
      <div className="center-container">
        <Navbar user={this.state.current_user} />
        
        {this.state.transaction_state == '<pending>' && <div ref={this.lottiePendingContainer} style={{height: '350px'}}></div>}
        {this.state.transaction_state == '<success>' && <div ref={this.lottieSuccessContainer} style={{height: '350px'}}></div>}
        {this.state.transaction_state == '<pending>' && <div style={{fontSize: '1.3rem', textAlign: 'center', fontWeight: 'bold'}}>Processing transaction.</div>}

      </div>
    </div>)
  }
}
