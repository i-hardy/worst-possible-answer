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
    deckID,
    deckName: deck.name,
    deckDesc: deck.description,
  });
});

router.post('/:id/deck/:deckID/remove', async (req, res) => {
  const { id, deckID } = req.params;
  const thisGame = GameController.findGame(id);
  if (!thisGame) {
    res.sendStatus(404);
    return;
  }
  thisGame.removeDeck(deckID);
  res.json({
    status: 'success',
  });
});

router.post('/:id/player/:playerName', (req, res) => {
  const { id, playerName } = req.params;
  const { name, icon, playerID } = GameController.addPlayerToGame(id, playerName);
  res.json({
    status: 'success',
    name,
    icon,
    playerID,
  });
});

router.post('/:id/start', (req, res) => {
  const { id } = req.params;
  const { winCondition } = req.body;
  const thisGame = GameController.findGame(id);
  thisGame.setWinCondition(winCondition);
  GameController.startGame(thisGame);
  res.sendStatus(200);
});

module.exports = router;
