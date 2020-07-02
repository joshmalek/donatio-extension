import React from "react";

import Logo from "../src/icons/logo.svg";

import encodeUrl from "encodeurl";

import { WidgetIntro } from "./WidgetIntro";
import { WidgetScroller } from "./WidgetScroller";

export default class SmallDonationWidget extends React.Component {
  constructor(props) {
    super(props);

    this.sliderRef = React.createRef();
    window.donatio_global.attachComponent(this);
  }

  getContributionValue() {
    let subtotal = window.donatio_global.getSubtotal();
    let ratio = window.donatio_global.getDonationRatio();
    if (subtotal == null) return "0.00";
    else return `${subtotal.symbol}${(subtotal.floatValue * ratio).toFixed(2)}`;
  }

  processTransaction() {
    if (window.donatio_global.donationActive()) {
      let transaction_amount = window.donatio_global.getDonationTotal();
      let npo_name = window.donatio_global.getCharityName();
      // let npo_id = window.donatio_global.getCharityId();
      // chrome.runtime.sendMessage(
      //   { transaction_amount, npo_id, type: "process_donation" },
      //   function (response) {
      //     console.log(`Message Response:`);
      //     console.log(response);
      //   }
      // );

      window.open(
        encodeUrl(
          `https://donatio-site.herokuapp.com/amazonPay?npo_name=${npo_name}&amount=${transaction_amount.value}`
        ),
        "_blank"
      );
    }
  }

  setRatio(e) {
    window.donatio_global
      .setDonationRatio(parseInt(e.target.value) / 100)
      .then(() => this.forceUpdate());
  }

  setValueRatio(val) {
    window.donatio_global
      .setDonationRatio(parseInt(val) / 100)
      .then(() => this.forceUpdate());
  }

  render() {
    return (
      <React.Fragment>
        <div className="widget-container">
          <div className="logo-header">
            <div className="logo-box">
              <img src={Logo} />
            </div>
            <div className="logo-text">Donatio</div>
          </div>
          <WidgetIntro
            donateClick={() => {
              console.log(`Clicked!`);
              window.donatio_global.toggleDonationActive().then(() => {
                this.forceUpdate();
              });
            }}
            isVisible={!window.donatio_global.donationActive()}
          />
          <WidgetScroller
            sliderChange={(e, val) => {
              this.setValueRatio(val);
            }}
            cancelClick={() => {
              window.donatio_global.toggleDonationActive().then(() => {
                this.forceUpdate();
              });
            }}
            donationValue={`+${this.getContributionValue()}`}
            isVisible={window.donatio_global.donationActive()}
          />
        </div>
        <button
          onClick={() => {
            this.processTransaction();
          }}
          style={{ marginBottom: "40px" }}
        >
          Sample Complete Order
        </button>
      </React.Fragment>
    );
  }
}

// () => {
//   console.log(`Clicked!`);
// window.donatio_global.toggleDonationActive().then(() => {
//   this.forceUpdate();
// });
// }

// isVisible={window.donatio_global.donationActive()}
