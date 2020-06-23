import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import lottie from "lottie-web";
import { motion, useAnimation } from "framer-motion";

import { ExperienceBar } from "./experienceBar";
import Lottie_PaymentSuccess from "../../src/lottie-files/16271-payment-successful.json";
import { getLevel, evaluateExperience } from "../../modules/experience.module";
import { MedalViewer } from "./medalViewer";

const clearChildren = (dom_element) => {
  while (dom_element.hasChildNodes()) {
    dom_element.removeChild(dom_element.lastChild);
    console.log(`Removed child...`);
  }
};

const RewardSlider = ({
  experience_value,
  experience_gained,
  medals_unlocked,
  updateLevel,
}) => {
  const contentContainer = useRef(null);
  const timerControl = useAnimation();
  const containerController = useAnimation();
  const wrapperController = useAnimation();
  const timerContainerController = useAnimation();

  const [startExperience, setStartExperience] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showMedals, setShowMedals] = useState(false);
  const [medalIndex, setMedalIndex] = useState(-1);

  const [levelStart, setLevelStart] = useState(
    evaluateExperience(experience_value)
  );
  const [levelEnd, setLevelEnd] = useState(
    evaluateExperience(experience_value + experience_gained)
  );
  // const display

  const loadSuccessPayment = () => {
    clearChildren(contentContainer.current);
    lottie.loadAnimation({
      container: contentContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: Lottie_PaymentSuccess,
    });
  };

  const undockSlider = async () => {
    containerController.start({
      opacity: 0,
      transition: { duration: 0.2 },
    });
    await containerController.start({
      transform: "translate(500px, 0px)",
      transition: { duration: 0.2 },
    });
  };

  const redockSlider = async () => {
    containerController.start({
      opacity: 1,
      transition: { duration: 0.2 },
    });
    await containerController.start({
      transform: "translate(0px, 0px)",
      transition: { duration: 0.2 },
    });
  };

  const emptySlide = async (should_not_clear_children) => {
    containerController.start({
      opacity: 0,
      transition: { duration: 0.2 },
    });
    await containerController.start({
      transform: "translate(-500px, 0px)",
      transition: { duration: 0.2 },
    });
    // TODO clear the body of the display container
    if (!should_not_clear_children) {
      clearChildren(contentContainer.current);
      containerController.start({
        opacity: 1,
        transition: { duration: 0.2 },
      });
    }
    await containerController.start({
      transform: "translate(0px, 0px)",
      transition: { duration: 0.2 },
    });
  };

  const runTimer = async () => {
    await timerControl.start({
      width: "100%",
      transition: { duration: 3.5 },
    });
    await timerControl.start({
      width: "0%",
      transition: { duration: 0.25 },
    });
  };

  const timerSequence = async () => {
    loadSuccessPayment();

    await runTimer();

    await emptySlide();
    await undockSlider();

    setShowExperience(true);

    await redockSlider();
    setStartExperience(true);

    await runTimer();

    await emptySlide();
    await undockSlider();

    if (medals_unlocked) {
      setShowMedals(true);

      for (let i = 0; i < medals_unlocked.length; ++i) {
        setMedalIndex(i);
        await redockSlider();

        await runTimer();

        await emptySlide(true);
        await undockSlider();
      }
    }

    // hide the wrapper
    timerContainerController.start({
      opacity: 0,
      transition: { duration: 0.5 },
    });
    await wrapperController.start({
      height: "0px",
      transition: { duration: 0.5 },
    });
  };

  useEffect(() => {
    // componentDidMount ()
    console.log(`Reward Slider mounted!`);
    timerSequence();

    // setTimeout(() => { setShowExperience(true) }, 2000)
  }, []);

  useEffect(() => {
    setLevelStart(evaluateExperience(experience_value));
    setLevelEnd(evaluateExperience(experience_value + experience_gained));
  }, [experience_value, experience_gained]);

  return (
    <motion.div className="reward-slider-container" animate={wrapperController}>
      <motion.div
        className="rewrd-slider-content-container"
        animate={containerController}
        ref={contentContainer}
      >
        {showExperience && (
          <ExperienceBar
            experience_level_start={levelStart}
            experience_level_end={levelEnd}
            start_animation={startExperience}
            updateLevel={(new_lvl) => {
              console.log(`Experience bar returned.`);
              updateLevel(new_lvl);
            }}
          />
        )}
        {showMedals && (
          <MedalViewer
            medal_name={
              medalIndex >= 0 && medalIndex < medals_unlocked.length
                ? medals_unlocked[medalIndex].name
                : "<null>"
            }
            medal_src={
              medalIndex >= 0 && medalIndex < medals_unlocked.length
                ? medals_unlocked[medalIndex].img_url
                : "<null>"
            }
            medal_description={
              medalIndex >= 0 && medalIndex < medals_unlocked.length
                ? medals_unlocked[medalIndex].description
                : "<null>"
            }
          />
        )}
      </motion.div>

      <motion.div
        animate={timerContainerController}
        className="slider-timer-container"
      >
        <motion.div animate={timerControl} className="slider-timer-filler">
          {}
        </motion.div>
      </motion.div>

      <div></div>
    </motion.div>
  );
};

export { RewardSlider };
