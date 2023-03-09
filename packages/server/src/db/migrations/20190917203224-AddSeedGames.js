const fs = require('fs');
const Game = require('../models/Game');

const games = JSON.parse(fs.readFileSync(__dirname + '/games.json', 'utf8'));

module.exports = {
  async up(queryInterface, Sequelize) {
    await Game.bulkCreate(games, {
      returning: true,
    });
  },
  async down(queryInterface) {
    // TODO: remove only the games that are added in up
    await queryInterface.bulkDelete('Game');
  },
};
