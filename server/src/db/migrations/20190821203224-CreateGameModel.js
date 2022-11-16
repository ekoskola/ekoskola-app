const { baseAttributes } = require('../../lib/model');

module.exports = {
  async up(queryInterface, Sequelize) {
    const { id, createdAt, updatedAt, deletedAt } = baseAttributes;
    await queryInterface.createTable('Game', {
      id,
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      objetive_1: {
        type: Sequelize.TEXT,
      },
      objetive_2: {
        type: Sequelize.TEXT,
      },
      objetive_3: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      grade: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      topics: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      classes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      subjects: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      ekoskola_steps: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      timing: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      number_teachers: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      physical_activity: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      file_id: {
        type: Sequelize.STRING,
      },
      createdAt,
      updatedAt,
      deletedAt,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Game');
  },
};
