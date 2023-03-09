const fs = require('fs');
// const Game = require('../models/game');

const games = JSON.parse(fs.readFileSync(__dirname + '/games.json', 'utf8'));
// console.log('games', games);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Games', [
      games.map(game => ({ ...game, createdAt: new Date(), updatedAt: new Date() }))[0],
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
