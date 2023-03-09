const path = require('path');

const deleteFile = require('../utils/deleteFile');
const Database = require('../lib/database');
const Game = require('../db/models/Game');

module.exports = async function remove(req, res) {
  const id = req.params.gameId;

  const where = {
    id,
  };

  await Database.transaction(async transaction => {
    try {
      const game = await Game.findOne({
        where,
        transaction,
      });
      const gamePath = path.join(__dirname, `../../uploads/${game.file_id}`);
      await Game.destroy({
        where,
        transaction,
      });

      // When game is removed, also remove the pdf file from the filesystem
      await deleteFile(gamePath);

      res.status(204).json({});
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction.rollback();
      res.status(500).json({ msg: 'ERROR REMOVING GAME' });
    }
  });
};
