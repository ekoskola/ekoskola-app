const Umzug = require('umzug');
const path = require('path');

const logger = require('./logger');

module.exports = class Migrations {
  constructor(sequelize) {
    this._umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize,
      },
      logging: message => logger.info(message),
      migrations: {
        path: path.resolve(process.cwd(), 'src/db/migrations'),
        params: [sequelize.getQueryInterface(), sequelize.constructor],
      },
    });
  }

  up() {
    return this._umzug.up();
  }

  down() {
    return this._umzug.down();
  }

  pending() {
    return this._umzug.pending();
  }
};
