import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const ExperienceBar = ({
    experience_level_start,
    experience_level_end,
    start_animation,
    updateLevel
}) => {

    const [levelStart, setLevelStart] = useState( Math.floor(experience_level_start) )
    const experienceControl = useAnimation()

    const showExperience = async (from, to) => {

        console.log(`${from} -> ${to}`)
        let percent_start = Math.floor(from) == levelStart ? null : `0%`
        let percent_end = Math.ceil(to) == levelStart + 1 ? `${ (to - Math.floor(to)) * 100 }%` : `100%`

        // show animation from start to end
        await experienceControl.start({
            width: percent_end,
            transform: { type: "ease", duration: 2 }
        })

        // if there is more experience to show, update the level value
        if (levelStart + 1 < Math.ceil(experience_level_end)) {
            await experienceControl.start({
                width: '0%',
                transform: { duration: 0.0 }
            })
            setLevelStart(levelStart + 1)
        }
        else {
            updateLevel(levelStart)
        }
    }

    useEffect(() => {
        console.log(`Experience Control`)
        console.log(experienceControl)
    }, [])

    useEffect(() => {

        if (start_animation) {
            showExperience (experience_level_start, experience_level_end)
        }

    }, [start_animation, levelStart])

    return (<div className="experience-bar-container">
        <div className="level-area level-left"><div className="level-circle">{ levelStart }</div></div>
        <div className="experience-bar">
            <motion.div animate={experienceControl} style={{ width: `${ (experience_level_start - Math.floor(experience_level_start)) * 100 }%` }} className="experience-bar-filler"></motion.div>
        </div>
        <div classname="level-area level-right"><div className="level-circle">{ levelStart + 1 }</div></div>
    </div>)
}

export { ExperienceBar }