import React from 'react'

const RewardPill = ({
    reward_src,
    reward_text
}) => {

    return (<div className="reward-pill">
        <div className="reward-icon"><img src={reward_src} width="65%" height="65%" /></div>
        <div className="reward-text">{reward_text}</div>
    </div>)
}

const RewardPreview = ({
    experience_gained
}) => {

    return (<div className="reward-preview-area">
        <RewardPill 
            reward_src={`https://svgur.com/i/M4w.svg`}
            reward_text={`+${experience_gained.toFixed(0)} exp. gained.`} 
        />
    </div>)

}

export { RewardPreview }