const fs = require('fs');
const path = require('path');

const Game = require('../db/models/Game');
const uuidv1 = require('uuid/v1');

const IncomingForm = require('formidable').IncomingForm;

module.exports = function upload(req, res) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ msg: 'ERROR PARSING GAME' });
    }

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

    const game = {
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
      file_id: uuidv1() + '.pdf',
    };
    const newGame = await Game.create(game);

    const targetPath = path.join(__dirname, `../../uploads/${newGame.file_id}`);
    const src = fs.createReadStream(files.file.path);
    const dest = fs.createWriteStream(targetPath);
    src.pipe(dest);

    src.on('end', function() {
      res.status(200).json(newGame);
    });
    src.on('error', function(err) {
      res.status(500).json({ msg: 'ERROR SAVING GAME' });
    });
  });
};
