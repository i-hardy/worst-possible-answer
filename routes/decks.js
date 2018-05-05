const express = require('express');
const cardcast = require('cardcast');

const router = express.Router();

async function getCalls(deckID) {
  return cardcast(deckID).calls();
}

async function getResponses(deckID) {
  return cardcast(deckID).responses();
}

async function getInfo(deckID) {
  return cardcast(deckID).info();
}

async function composeDeck(deckID) {
  const calls = getCalls(deckID);
  const responses = getResponses(deckID);
  const info = getInfo(deckID);
  const { name, code, description } = await info;
  return {
    name,
    code,
    description,
    calls: await calls,
    responses: await responses,
  };
}

/* GET users listing. */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const deck = await composeDeck(id);
  res.json(deck);
});

module.exports = router;
