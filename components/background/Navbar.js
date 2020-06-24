import React from "react";
import ReactDOM from "react-dom";

import Logo from "../../src/icons/logo.svg";

import { AssetVars } from "../../src/js/assetVars";
import { getLevel } from "../../modules/experience.module";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      medals_updated: false,
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // get updated medals, if there are any
    if (this.props.user != null && this.state.user == null) {
      this.setState({
        user: this.props.user,
      });
    }
    if (this.props.updatedMedals != null && !this.state.medals_updated) {
      let new_user = this.props.user;
      new_user.medals = [...new_user.medals, ...this.props.updatedMedals];
      console.log(`Medals Updated -> New User`);
      console.log(new_user);

      this.setState({
        user: new_user,
        medals_updated: true,
      });
    }

    // this.setState({
    //   user: new_user,
    // });
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

  createMedal(medal_) {
    let width_ = medal_.name.length * 8;
    return (
      <div className="name-medal-icon">
        <img
          src={AssetVars[medal_.asset_key]}
          style={{ marginRight: "5px" }}
          width="30px"
          height="30px"
        />
        <div
          className="medal-icon-hover-desc"
          style={{
            width: `${width_}px`,
            marginLeft: `-${width_ / 2}px`,
          }}
        >
          {medal_.name}
        </div>
      </div>
    );
  }

  getTopMedals() {
    let top_medals = [];

    if (this.state.user && this.state.user.medals) {
      for (let i = 0; i < Math.min(5, this.props.user.medals.length); ++i) {
        let medal_ = this.props.user.medals[i];

        // TODO implement new medal aquisition system.
        top_medals.push(this.createMedal(medal_));
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
