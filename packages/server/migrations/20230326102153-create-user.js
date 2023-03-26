/** @type {import('sequelize-cli').Migration} */

const { baseAttributes } = require('../models/baseAttributes');

module.exports = {
  async up(queryInterface, Sequelize) {
    const { id, createdAt, updatedAt, deletedAt } = baseAttributes;
    await queryInterface.createTable('Users', {
      id,
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
      },
      password: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt,
      updatedAt,
      deletedAt,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
