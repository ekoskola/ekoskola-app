const Sequelize = require('sequelize');

const Database = require('../../lib/database');

class Games extends Sequelize.Model {}

Games.init(
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
    isTop: {
      type: Sequelize.BOOLEAN,
    },
    votes_value: {
      type: Sequelize.INTEGER,
    },
    votes_count: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize: Database,
  },
);

module.exports = Games;
