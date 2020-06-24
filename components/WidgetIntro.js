import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const WidgetIntro = ({ donateClick, isVisible }) => {
  const containerController = useAnimation();

  const hideIntro = async () => {
    await containerController.start({
      opacity: 0,
      display: "none",
      transition: { duration: 1 },
    });
  };

  const showIntro = async () => {
    await containerController.start({
      opacity: 1,
      display: "block",
      transition: { duration: 2 },
    });
  };

  useEffect(() => {
    if (!isVisible) {
      // hide the container
      hideIntro();
    } else {
      showIntro();
    }
  }, [isVisible]);

  return (
    <motion.div animate={containerController}>
      <div className="paragraph-area">
        Click here to donate to charity with your checkout.
      </div>
      <div
        className="parallel-btn"
        onClick={() => {
          if (donateClick) donateClick();
        }}
      >
        <div className="btn-text">Donate</div>
      </div>
    </motion.div>
  );
};

export { WidgetIntro };
