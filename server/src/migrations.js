require('dotenv').config();

const cliTable = require('cli-table3');
const { white, bold } = require('colorette');

const cli = require('./lib/cli');
const database = require('./lib/database');
const Migrations = require('./lib/migrations');
const logger = require('./lib/logger');

async function bootstrap() {
  const migrations = new Migrations(database);

  cli.defineCommand('pending', 'List pending migrations', async () => {
    const list = await migrations.pending();
    const table = new cliTable({
      head: [white(bold(`Pending Migrations: ${list.length}`))],
    });
    list.forEach(migration => {
      table.push([migration.file]);
    });
    logger.info(`\n${table.toString()}`);
  });
  cli.defineCommand(
    'migrate',
    'Run pending migrations',
    async () => await migrations.up()
  );
  cli.defineCommand(
    'rollback',
    'Run pending migrations',
    async () => await migrations.down()
  );

  cli.listen();
}

bootstrap().catch(logger.error);
