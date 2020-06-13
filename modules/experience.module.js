// Calculate the level of a user based on the experience

const getLevel = (experience_value) => {
    
    return Math.floor(experience_value).toFixed(0)
}

export { getLevel }