// Calculate the level of a user based on the experience

const evaluateExperience = (experience_value) => {
    return Math.log((experience_value / 3) + 1)
}

const getLevel = (experience_value) => {
    
    return Math.floor(evaluateExperience( experience_value )).toFixed(0)
}

export { getLevel }