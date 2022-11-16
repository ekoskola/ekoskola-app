const args = require('caporal');

const version = require('../../package').version;

module.exports = new (class CLI {
  constructor() {
    this._args = args;
    this._args.version(version);
  }

  defineCommand(name, description, cb) {
    return this._args.command(name, description).action(cb);
  }

  listen() {
    return this._args.parse(process.argv);
  }
})();
