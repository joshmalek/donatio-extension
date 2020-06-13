import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar'

export default class BackgroundAppContainer extends React.Component {

  render () {
    return (<div className="background-container">
      <div className="center-container">
        <Navbar />
      </div>
    </div>)
  }
}
