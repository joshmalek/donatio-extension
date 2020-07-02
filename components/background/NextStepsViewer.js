import React, { useEffect } from "react";

import SecureSVG from "../../src/icons/undraw-secure.svg";
import MobileAppSVG from "../../src/icons/undraw-app.svg";
import CheckSVG from "../../src/icons/check.svg";

import { useAnimation, motion } from "framer-motion";

const NextStepsViewer = ({ show, email_confirmed }) => {
  const containerController = useAnimation();

  const showSteps = async () => {
    await containerController.start({
      opacity: 1,
      transition: { duration: 3.5 },
    });
  };

  useEffect(() => {
    console.log(`NextStepsViewer show ? ${show}`);
    if (show) {
      // play the show animation!
      showSteps();
    }
  }, [show]);

  return (
    <motion.div
      style={{ opacity: 0 }}
      animate={containerController}
      className="next-steps-viewer"
    >
      <div
        style={{
          fontFamily: "Yan",
          fontSize: "28px",
          fontWeight: 600,
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Next Steps
      </div>
      {email_confirmed && (
        <div className="step-row">
          <div className="step-complete">
            <div className="icon-area">
              <img src={CheckSVG} height="24px" />
            </div>
            <div
              className="text-area"
              style={{ fontFamily: "Yan", fontSize: "24px", fontWeight: 600 }}
            >
              Email Confirmed
            </div>
          </div>
        </div>
      )}
      {!email_confirmed && (
        <div className="step-row">
          <div className="image-area">
            <img src={SecureSVG} height="80px" />
          </div>
          <div className="text-area">
            <div
              style={{ fontFamily: "Yan", fontSize: "24px", fontWeight: 600 }}
            >
              Confirm Your Email
            </div>
            <div style={{ fontFamily: "OpenSans", fontSize: "20px" }}>
              Confirm your email to setup the password for your account.
              <div
                className="parallel-btn smaller-widget-button"
                style={{ margin: "20px 0 0 0", color: "white" }}
              >
                <div className="btn-text">Send Email</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="step-row">
        <div className="image-area">
          <img src={MobileAppSVG} height="80px" />
        </div>
        <div className="text-area">
          <div style={{ fontFamily: "Yan", fontSize: "24px", fontWeight: 600 }}>
            Donload the Mobile App
          </div>
          <div style={{ fontFamily: "OpenSans", fontSize: "20px" }}>
            Download the Donatio Mobile app to keep track of your donation
            statistics, your rankings in the leaderboard, and your unlocked
            medals.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NextStepsViewer;
