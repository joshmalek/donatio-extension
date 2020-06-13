import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar'
import axios from 'axios'
import lottie from 'lottie-web'

export default class BackgroundAppContainer extends React.Component {

  constructor(props) {
    super(props)

    console.log(`In BackgroundAppContainer Constructor`)
    console.log(this.props.donation_info)

    this.lottieContainer = React.createRef ()

    this.state = {
      current_user: null
    }
  }

  componentDidMount () {
    this.getCurrentUser ()

    // load lottie
    lottie.loadAnimation({
      container: this.lottieContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../src/lottie-files/18176-card-payment-in-process.json')
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
        
        <div ref={this.lottieContainer} style={{height: '350px'}}></div>
        <div style={{fontSize: '1.3rem', textAlign: 'center', fontWeight: 'bold'}}>Processing transaction.</div>

      </div>
    </div>)
  }
}
