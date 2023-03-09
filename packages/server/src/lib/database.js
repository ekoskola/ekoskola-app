const Sequelize = require('sequelize');
const logger = require('./logger');
require('dotenv').config();

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  // ssl: config.ssl,
  // dialectOptions: {
  //   ssl: config.ssl
  // },
  // native: true,
  logging: message => logger.debug(message),
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
  },
  define: {
    paranoid: true,
    freezeTableName: true,
  },
  timezone: process.env.DB_TIMEZONE,
});
