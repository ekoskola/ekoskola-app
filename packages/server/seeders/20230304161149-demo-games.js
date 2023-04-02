const fs = require('fs');

const games = JSON.parse(fs.readFileSync(__dirname + '/games.json', 'utf8'));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const formattedGames = games.map(game => {
      for (const prop in game) {
        if (Array.isArray(game[prop]) && game[prop].length === 0) {
          console.log(`${prop} is an empty array`);
          // Removing properties with empty array so it does not create error in db.
          delete game[prop];
        }
      }
      return {
        ...game,
        createdAt: new Date(),
        updatedAt: new Date(),
        isTop: true,
      };
    });
    return queryInterface.bulkInsert('Games', formattedGames);
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
