import React from 'react'

const MedalViewer = ({
    medal_name,
    medal_src,
    medal_description
}) => {

    return (<div className="medal-viewer">
        <div className="image-area"><img width="100%" height="100%" src={medal_src} /></div>
        <div className="text-area">{medal_name}</div>
        <div className="description-area">{medal_description}</div>
    </div>)
}

export { MedalViewer }