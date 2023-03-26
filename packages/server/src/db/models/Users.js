const Sequelize = require('sequelize');

const Database = require('../../lib/database');

class Users extends Sequelize.Model {}

Users.init(
  {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    sequelize: Database,
  },
);

module.exports = Users;
