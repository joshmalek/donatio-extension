import React from "react";

export default class AmazonOrderTotalLargeInhibitor extends React.Component {
  constructor(props) {
    super(props);

    window.donatio_global.attachComponent(this);
  }

  getSubtotalValue() {
    let subtotal = window.donatio_global.getSubtotal();
    let ratio = window.donatio_global.getDonationRatio();
    if (window.donatio_global.donationActive()) {
      return `${subtotal.symbol}${(
        subtotal.floatValue +
        subtotal.floatValue * ratio
      ).toFixed(2)}`;
    } else {
      return `${subtotal.symbol}${subtotal.floatValue}`;
    }
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          top: "18px",
        }}
      >
        <span
          className={`a-size-medium ${
            window.donatio_global.donationActive()
              ? "a-donatio-color-price"
              : "a-color-price"
          } subtotal-amount a-text-bold`}
        >
          Order total:<span className="a-letter-space"></span>
          {this.getSubtotalValue()}
        </span>
      </div>
    );
  }
}
