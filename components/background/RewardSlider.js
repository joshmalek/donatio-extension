import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import lottie from 'lottie-web'
import { motion, useAnimation } from 'framer-motion'

import { ExperienceBar } from './experienceBar'
import Lottie_PaymentSuccess from '../../src/lottie-files/16271-payment-successful.json'
import { getLevel, evaluateExperience } from '../../modules/experience.module'

const clearChildren = (dom_element) => {
    while (dom_element.hasChildNodes()) {
      dom_element.removeChild(dom_element.lastChild)
      console.log(`Removed child...`)
    }
  }

const RewardSlider = ({ 
    experience_value,
    experience_gained,
    medals_unlocked
 }) => {

    const contentContainer = useRef(null)
    const timerControl = useAnimation()
    const containerController = useAnimation()

    const [showExperience, setShowExperience] = useState(false)
    // const display

    const loadSuccessPayment = () => {

        clearChildren(contentContainer.current)
        lottie.loadAnimation({
            container: contentContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: Lottie_PaymentSuccess
        })
    }

    const emptySlide = async () => {
        await containerController.start({
            transform: 'translate(-5000px, 0px)',
            transition: { duration: 0.5 }
        })
        // TODO clear the body of the display container
        clearChildren(contentContainer.current)
        await containerController.start({
            transform: 'translate(0px, 0px)',
            transition: { duration: 0.5 }
        })
    }

    const timerSequence = async () => {

        loadSuccessPayment ()
        await timerControl.start({
            width: '100%',
            transition: { duration: 2 }
        })
        await timerControl.start({
            width: '0%',
            transition: { duration: 0.25 }
        })
        await emptySlide ()
    }

    useEffect(() => { // componentDidMount ()
        console.log(`Reward Slider mounted!`)
        timerSequence ()

        setTimeout(() => { setShowExperience(true) }, 3000)
    }, [])

    return (<div className="reward-slider-container">

        <motion.div className="rewrd-slider-content-container" animate={containerController} ref={contentContainer}></motion.div>

        <div className="slider-timer-container">
            <motion.div animate={timerControl} className="slider-timer-filler">{  }</motion.div>
        </div>

        <div>
            <ExperienceBar 
                experience_level_start={2.1} 
                experience_level_end={3.6}
                start_animation={showExperience}    
            />
        </div>
    </div>)

}

export { RewardSlider }