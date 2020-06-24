import React from "react";

import { LargeWidgetIntro } from "./LargeWidgetIntro";
import { LargeWidgetScroller } from "./LargeWidgetScroller";

import Logo from "../../src/icons/logo.svg";

export default class LargeDonationWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.donatio_global.attachComponent(this);
  }

  setValueRatio(val) {
    window.donatio_global
      .setDonationRatio(parseInt(val) / 100)
      .then(() => this.forceUpdate());
  }

  getContributionValue() {
    let subtotal = window.donatio_global.getSubtotal();
    let ratio = window.donatio_global.getDonationRatio();
    if (subtotal == null) return "0.00";
    else return `${subtotal.symbol}${(subtotal.floatValue * ratio).toFixed(2)}`;
  }

  render() {
    return (
      <div className="widget-container">
        <div className="logo-header">
          <div className="logo-box">
            <img src={Logo} />
          </div>
          <div className="logo-text">Donatio</div>
        </div>
        <LargeWidgetIntro
          donateClick={() => {
            console.log(`Clicked!`);
            window.donatio_global.toggleDonationActive().then(() => {
              this.forceUpdate();
            });
          }}
          isVisible={!window.donatio_global.donationActive()}
        />
        <LargeWidgetScroller
          isVisible={window.donatio_global.donationActive()}
          sliderChange={(e, val) => {
            this.setValueRatio(val);
          }}
          donationValue={`+${this.getContributionValue()}`}
          cancelClick={() => {
            window.donatio_global.toggleDonationActive().then(() => {
              this.forceUpdate();
            });
          }}
        />
      </div>
    );
  }
}
