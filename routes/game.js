const express = require('express');
const GameController = require('../models/gameController');
const DeckBuilder = require('../models/deckBuilder');

const router = express.Router();
const builder = new DeckBuilder();

/* GET users listing. */
router.get('/new/:name', (req, res) => {
  const { name } = req.params;
  const { id, owner } = GameController.gameSetup(name);
  res.json({
    status: 'success',
    id,
    owner,
  });
});

router.post('/:id/deck/:deckID', async (req, res) => {
  const { id, deckID } = req.params;
  const thisGame = GameController.findGame(id);
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

router.post('/:id/player/:playerName', (req, res) => {
  const { id, playerName } = req.params;
  const { name, playerID } = GameController.addPlayerToGame(id, playerName);
  res.json({
    status: 'success',
    name,
    playerID,
  });
});

module.exports = router;
