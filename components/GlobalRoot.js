import React from 'react'
import ReactDOM from 'react-dom'

export default class GlobalRoot extends React.Component {

  constructor (props) {
    super(props)

    window.donatio_global = this

    this.state = {
      donation_active: false
    }
  }


  render () {
    return (<div></div>)
  }

}
