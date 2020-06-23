import React from "react";
import ReactDOM from "react-dom";

import Logo from "../../src/icons/logo.svg";

import { getLevel } from "../../modules/experience.module";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  getLevel() {
    if (this.props.updatedLevel) {
      console.log(`new: ${this.props.updatedLevel}`);
      return this.props.updatedLevel;
    }
    let lvl_ = getLevel(
      this.props.user == null ? 1 : this.props.user.experience
    );
    console.log(`old: ${lvl_}`);
    return lvl_;
  }

  getTopMedals() {
    let top_medals = [];

    if (this.props.user && this.props.user.medals) {
      for (let i = 0; i < Math.min(3, this.props.user.medals.length); ++i) {
        let medal_ = this.props.user.medals[i];
        top_medals.push(
          <img src={medal_.img_url} width="30px" height="30px" />
        );
      }
    }

    return top_medals;
  }

  render() {
    return (
      <div className="donatio-navbar">
        <div className="left">
          <div className="logo-area">
            <img
              style={{
                position: "relative",
                top: "5px",
              }}
              src={Logo}
              height="40px"
            />
          </div>
          <div className="name-area">
            {this.props.user == null
              ? "<firstname>"
              : this.props.user.firstName}{" "}
            {this.props.user == null ? "<lastname>" : this.props.user.lastName}
            <div className="level-area">Lv. {this.getLevel()}</div>
            <div className="medals-area">{this.getTopMedals()}</div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    );
  }
}
