import React from 'react'
import ReactDOM from 'react-dom'

import { getLevel } from '../../modules/experience.module'

export default class Navbar extends React.Component {

  constructor(props) {
    super(props)
  }

  getLevel () {
    if (this.props.updatedLevel) {console.log(`new: ${this.props.updatedLevel}`); return this.props.updatedLevel;}
    let lvl_ = getLevel( this.props.user == null ? 1 : this.props.user.experience )
    console.log(`old: ${lvl_}`)
    return lvl_
  }

  render () {
    return (<div className="donatio-navbar">
        <div className="left">
          <div className="logo-area"><img src="https://svgur.com/i/M1m.svg" height="50px" /></div>
          <div className="name-area">
  {this.props.user==null ? '<firstname>':this.props.user.firstName} {this.props.user==null ? '<lastname>':this.props.user.lastName} <div className="level-area">Lv. { this.getLevel() }</div></div>
        </div>
        <div className="right"></div>
      </div>)
  }
}
