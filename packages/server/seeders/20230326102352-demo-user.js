/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // TODO: make this an env variable
    const password = await bcrypt.hash('test', 10);
    console.log('password', password);

    return queryInterface.bulkInsert('Users', [
      {
        username: 'test',
        password: password,
        email: 'example@example.com',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
