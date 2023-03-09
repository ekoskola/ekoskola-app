const fs = require('fs');
const path = require('path');

const deleteFile = require('../utils/deleteFile');
const Database = require('../lib/database');
const Game = require('../db/models/Game');
const uuidv1 = require('uuid/v1');

const IncomingForm = require('formidable').IncomingForm;

module.exports = function update(req, res) {
  const form = new IncomingForm();
  const id = req.params.gameId;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ msg: 'ERROR PARSING GAME' });
    }

    const isWithFile = !!files.file;

    const previousGame = await Game.findOne({
      where: {
        id,
      },
    });

    const {
      name,
      description,
      objetive_1,
      objetive_2,
      objetive_3,
      location,
      grade,
      topics,
      classes,
      subjects,
      ekoskola_steps,
      timing,
      physical_activity,
      number_teachers,
    } = JSON.parse(fields.game);

    const updatedGame = {
      name,
      description,
      objetive_1,
      objetive_2,
      objetive_3,
      location,
      grade,
      topics,
      classes,
      subjects,
      ekoskola_steps,
      timing,
      physical_activity,
      number_teachers,
      file_id: isWithFile ? uuidv1() + '.pdf' : previousGame.file_id,
    };

    await Database.transaction(async transaction => {
      try {
        await Game.update(updatedGame, {
          where: {
            id,
          },
          transaction,
        });
        if (isWithFile) {
          const toDeleteGamePath = path.join(__dirname, `../../uploads/${previousGame.file_id}`);
          await deleteFile(toDeleteGamePath);
          const updatedGamePath = path.join(__dirname, `../../uploads/${updatedGame.file_id}`);
          const src = fs.createReadStream(files.file.path);
          const dest = fs.createWriteStream(updatedGamePath);
          src.pipe(dest);
          src.on('end', function () {
            res.status(200).json({});
          });
          src.on('error', function (err) {
            throw new Error(err);
          });
        } else {
          res.status(200).json({});
        }
      } catch (error) {
        await transaction.rollback();
        res.status(500).json({ msg: 'ERROR REMOVING GAME' });
      }
    });
  });
};
