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
    experience_gained,
    medals_unlocked
}) => {

    const showMedals = () => {
        let medal_pills = []

        if (medals_unlocked) {
            for (let i = 0; i < medals_unlocked.length; ++i) {
                medal_pills.push(<RewardPill 
                    reward_src={medals_unlocked[i].img_url}
                    reward_text={medals_unlocked[i].name}
                />)
            }
        }

        return medal_pills
    }

    return (<div className="reward-preview-area">
        <RewardPill 
            reward_src={`https://svgur.com/i/M4w.svg`}
            reward_text={`+${experience_gained.toFixed(0)} exp. gained.`} 
        />
        { showMedals () }
    </div>)

}

export { RewardPreview }