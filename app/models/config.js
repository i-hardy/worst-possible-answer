
const config = {
  first: parseInt(process.env.ROUND_FIRST_TIMEOUT, 10),
  second: parseInt(process.env.ROUND_SECOND_TIMEOUT, 10),
  gap: parseInt(process.env.ROUND_GAP_TIMEOUT, 10),
  handSize: parseInt(process.env.CARDS_PER_HAND, 10),
};

module.exports = config;
