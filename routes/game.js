const express = require('express');
const uuidv4 = require('uuid/v4');
const Game = require('../models/game');
const DeckBuilder = require('../models/deckBuilder');

const router = express.Router();
const games = [];
const builder = new DeckBuilder();

/* GET users listing. */
router.get('/new', (req, res) => {
  const id = uuidv4();
  games.push(new Game(id));
  res.json({ id });
});

router.post('/:id/deck/:deckID', async (req, res) => {
  const { id, deckID } = req.params;
  const thisGame = games.find(game => game.id === id);
  if (!thisGame) {
    res.sendStatus(404);
    return;
  }
  const deck = await builder.buildDeck(deckID);
  thisGame.addDeck(deck);
  res.json({
    status: 'success',
    deckName: deck.name,
    deckDesc: deck.description,
  });
});

module.exports = router;
