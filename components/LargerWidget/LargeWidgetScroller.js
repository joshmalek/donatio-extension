import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Slider } from "@material-ui/core";

const LargeWidgetScroller = ({
  isVisible,
  sliderChange,
  donationValue,
  cancelClick,
}) => {
  const containerController = useAnimation();

  const showIt = async () => {
    await containerController.start({
      opacity: 1,
      display: "block",
      transition: { duration: 2 },
    });
  };

  const hideIt = async () => {
    await containerController.start({
      opacity: 0,
      display: "none",
      transition: { duration: 1 },
    });
  };

  useEffect(() => {
    if (isVisible) {
      showIt();
    } else {
      hideIt();
    }
  }, [isVisible]);
  return (
    <motion.div animate={containerController}>
      <div className="scroll-area">
        <div style={{ flexGrow: 1 }}>5%</div>
        <div style={{ flexGrow: 6 }} className="slider-element">
          <Slider
            min={5}
            max={100}
            onChange={(e, val) => {
              sliderChange(e, val);
            }}
            color="secondary"
            track="normal"
          />
        </div>
        <div style={{ flexGrow: 1, textAlign: "right" }}>100%</div>
      </div>
      <div className="larger-donation-info-area">
        <div className="donatio-donation-value">{donationValue}</div>
        <div className="donatio-donation-charity">
          <div className="label-value" style={{ margin: 0 }}>
            <div className="label-area">
              <div className="label-text">Today's Charity</div>
            </div>
            <div className="label-value-inp">
              <div className="label-text">
                {window.donatio_global.getCharityName()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="widget-cancel-button"
        onClick={() => {
          if (cancelClick) cancelClick();
        }}
      >
        cancel
      </div>
    </motion.div>
  );
};

export { LargeWidgetScroller };
