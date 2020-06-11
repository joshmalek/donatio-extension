import React from 'react'
import ReactDOM from 'react-dom'

export default class SmallDonationWidget extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let sampleStyle = {
      padding: '10px',
      backgroundColor: 'red',
      color: 'white',
      fontSize: '20px'
    }

    return (<div style={sampleStyle}>This should be a small donation widget :)</div>)
  }
}
