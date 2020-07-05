// Calculate the level of a user based on the experience

const evaluateExperience = (experience_value) => {
  if (experience_value == 0) return 1;
  return Math.log10(5 * experience_value + 1);
  return experience_value + 1;
};

const getLevel = (experience_value) => {
  return Math.floor(evaluateExperience(experience_value)).toFixed(0);
};

export { evaluateExperience, getLevel };
