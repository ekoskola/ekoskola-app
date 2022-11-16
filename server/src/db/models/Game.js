const Sequelize = require('sequelize');

const Database = require('../../lib/database');

class Game extends Sequelize.Model {}

Game.init(
  {
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
  },
  {
    sequelize: Database,
  }
);

module.exports = Game;
