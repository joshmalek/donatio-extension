import React from "react";
import ReactDOM from "react-dom";
import GlobalRoot from "./components/GlobalRoot";
import SmallDonationWidget from "./components/SmallDonationWidget";
import LargeDonationWidget from "./components/LargerWidget/LargeDonationWidget";
import AmazonOrderTotalInhibitor from "./components/AmazonOrderTotalInhibitor";
import AmazonOrderTotalLargeInhibitor from "./components/LargerWidget/AmazonOrderTotalLargeInhibitor";

import "./src/css/style.scss";

window.addEventListener("load", function () {
  // (1) insert the global component that handles the main state
  let donatio_root_container = document.createElement("span");
  document.getElementsByTagName("body")[0].append(donatio_root_container);
  ReactDOM.render(<GlobalRoot />, donatio_root_container);

  // (2) Find subtotal and store in global root
  let cart_subtotal_table = document.getElementById(
    "subtotals-marketplace-table"
  );
  let subtotal_dom = cart_subtotal_table.querySelector("td.grand-total-price");
  if (subtotal_dom) {
    window.donatio_global.parseSubtotal(subtotal_dom.innerText);

    subtotalInhibition(cart_subtotal_table.lastChild);
  } else {
    // wait for the subtotal to load
    const subtotalObserver = new MutationObserver((mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          const subtotal_dom = cart_subtotal_table.querySelector(
            "td.grand-total-price"
          );
          if (subtotal_dom) {
            window.donatio_global.parseSubtotal(subtotal_dom.innerText);
            subtotalInhibition(cart_subtotal_table.lastChild);
          }
        }
      }
    });
    subtotalObserver.observe(cart_subtotal_table, {
      childList: true,
    });
  }

  // larget subtotal inhibitor
  let cart_large_subtotal_area = document.getElementById(
    "subtotals-marketplace-spp-bottom"
  );
  if (cart_large_subtotal_area) {
    largeSubtotalInhibitor(cart_large_subtotal_area);
  } else {
    const largeSubtotalObserver = new MutationObserver(
      (mutationList, observer) => {
        for (mutation of mutationList) {
          if (mutation.type === "childList") {
            const targetSubtotalArea = document.querySelector(
              "subtotals-marketplace-spp-bottom"
            );
            if (targetSubtotalArea) {
              largeSubtotalInhibitor(cart_large_subtotal_area);
            }
          }
        }
      }
    );
  }

  // (3) insert the small donation widget at the top of the righthand checkout modal
  let watch = document.getElementById("subtotals");
  if (watch == null) watch = document.getElementById("right-grid");
  const target = watch.querySelector("div.a-box-inner");
  if (target) {
    app(null, target);
  } else {
    // if the target isn't present automatically on load, then we create a MutationObserver
    // to monitor changes so we can find the element wa want once it loads.
    const observer = new MutationObserver((mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          const target = watch.querySelector("div.a-box-inner");
          if (target) {
            app(observer, target);
          }
        }
      }
    });

    observer.observe(watch, {
      childList: true,
    });
  }

  // (4) insert the larget donation widget where the left subtotal table is
  let largeSubtotal = document.getElementById("bottomsubtotals");
  // if (largeSubtotal == null)
  const elementTarget = largeSubtotal.querySelector("div.a-box-inner");
  if (elementTarget) {
    largeWidgetApp(null, elementTarget);
  } else {
    const observer = new MutationObserver((mutationList, observer) => {
      for (const mutation of mutationList) {
        const target = watch.querySelector("div.a-box-inner");
        if (target) {
          largeWidgetApp(observer, target);
        }
      }
    });
  }
}); // end addEventListener

const app = (observer, target) => {
  if (observer) observer.disconnect();

  if (!document.getElementById("donatio-donation-widget")) {
    const parent = target;
    const root = document.createElement("div");
    root.setAttribute("id", "donatio-donation-widget");

    parent.prepend(root);
    ReactDOM.render(
      <SmallDonationWidget />,
      document.getElementById("donatio-donation-widget")
    );
  }
};

const largeWidgetApp = (observer, target) => {
  if (observer) observer.disconnect();

  if (!document.getElementById("donatio-donation-widget-larger")) {
    const parent = target;
    const root = document.createElement("div");
    root.setAttribute("id", "donatio-donation-widget-larger");

    parent.prepend(root);
    ReactDOM.render(
      <LargeDonationWidget />,
      document.getElementById("donatio-donation-widget-larger")
    );
  }
};

const subtotalInhibition = (table_row) => {
  let previous = table_row.querySelector("tr.order-summary-grand-total");
  let order_total_row = previous.nextSibling.nextSibling;

  // disable order_total_row, then create AmazonOrderTotalInhibitor and pass
  // order_total_row to it
  if (order_total_row) {
    const parent = order_total_row.parentNode.parentNode;
    const inhibitonRoot = document.createElement("div");
    inhibitonRoot.setAttribute("id", "donatio-subtotal-rows");

    parent.parentNode.insertBefore(inhibitonRoot, parent);
    parent.parentNode.insertBefore(parent, inhibitonRoot);

    let cached_subtotal = order_total_row.lastChild.previousSibling.innerText;
    order_total_row.remove();
    ReactDOM.render(
      <AmazonOrderTotalInhibitor defaultSubtotal={cached_subtotal} />,
      document.getElementById("donatio-subtotal-rows")
    );
  }
};

const largeSubtotalInhibitor = (subtotal_element) => {
  console.log(`Larger Subtotal!`);
  console.log(subtotal_element);
  if (subtotal_element) {
    const newLargeSubtotal = document.createElement("span");
    newLargeSubtotal.setAttribute("id", "donatio-large-subtotal-inhibotor");
    subtotal_element.parentNode.insertBefore(
      newLargeSubtotal,
      subtotal_element
    );

    subtotal_element.remove();

    ReactDOM.render(
      <AmazonOrderTotalLargeInhibitor />,
      document.getElementById("donatio-large-subtotal-inhibotor")
    );
  }
};
