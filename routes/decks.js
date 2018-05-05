const express = require('express');
const router = express.Router();
const cardcast = require('cardcast');

async function getCalls(deckID) {
  return cardcast(deckID).calls();
}

async function getResponses(deckID) {
  return cardcast(deckID).responses();
}

async function composeDeck(deckID) {
  const calls = getCalls(deckID);
  const responses = getResponses(deckID);
  return {
    deckID,
    calls: await calls,
    responses: await responses,
  }
}

/* GET users listing. */
router.get('/:id', async function(req, res, next) {
  const { id } = req.params;
  const deck = await composeDeck(id);
  res.json(deck);
});

module.exports = router;
