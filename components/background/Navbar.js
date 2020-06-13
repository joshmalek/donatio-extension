import React from 'react'
import ReactDOM from 'react-dom'

export default class Navbar extends React.Component {

  render () {
    return (<div className="donatio-navbar">
        <div className="left">
          <div className="logo-area"><img src="https://svgur.com/i/M1m.svg" height="50px" /></div>
          <div className="name-area">Sample Name</div>
        </div>
        <div className="right">x</div>
      </div>)
  }
}
