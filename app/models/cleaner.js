/* eslint no-console: 0 */

const schedule = require('node-schedule');
const moment = require('moment');
const GameController = require('./gameController');

const rule = new schedule.RecurrenceRule();
rule.minute = 59;

function cleanIdleGames() {
  let cleanedCount = 0;
  GameController.gameEngines.forEach((engine) => {
    const now = moment();
    const idleTime = moment.duration(now.diff(engine.lastActive));
    if (idleTime.asMinutes() >= 30) {
      engine.stop();
      cleanedCount += 1;
    }
  });
  console.log(`${cleanedCount} idle games cleared`);
};

schedule.scheduleJob(rule, cleanIdleGames);
