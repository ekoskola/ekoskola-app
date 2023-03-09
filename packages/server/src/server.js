const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const upload = require('./services/Upload');
const update = require('./services/Update');
const remove = require('./services/Remove');
const authService = require('./services/AuthService');

const Games = require('./db/models/Game');

require('dotenv').config();

const app = express();
const port = process.env.APP_PORT;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // TODO: restrict it.
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, './../../client/build')));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Server is healthy',
  });
});

app.post('/login', (req, res, next) => {
  const expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  const { username, password } = req.body;
  const secretUserName = process.env.APP_USERNAME;
  const secretPassword = process.env.APP_PASSWORD;

  if (username === secretUserName && password === secretPassword) {
    const token = authService.issue({
      username,
    });
    res.cookie('token', token, { expires: expirationDate, httpOnly: true });
    return res.status(200).json({ token });
  } else {
    return res.status(403).json({ msg: 'ACCESS FORBIDDEN' });
  }
});

app.post('/logout', (req, res, next) => {
  res.cookie('token', null, { httpOnly: true });
  return res.status(200).json({});
});

app.get('/game/:id', async (req, res, next) => {
  const { id } = req.params;

  const response = await Games.findOne({
    where: {
      id,
    },
  });
  res.json(response.dataValues);
});

app.get('/game', async (req, res, next) => {
  console.log('game');
  const {
    limit,
    offset,
    location,
    grade,
    topics,
    classes,
    subjects,
    ekoskola_steps,
    timing,
    number_teachers,
    physical_activity,
  } = req.params;

  const where = {};
  if (grade && grade.length > 0) {
    where.grade = grade;
  }

  if (location && location.length > 0) {
    where.location = location;
  }

  if (topics && topics.length > 0) {
    where.topics = topics;
  }

  if (classes && classes.length > 0) {
    where.classes = classes;
  }

  if (subjects && subjects.length > 0) {
    where.subjects = subjects;
  }

  if (ekoskola_steps && ekoskola_steps.length > 0) {
    where.subjects = ekoskola_steps;
  }

  if (timing && timing.length > 0) {
    where.timing = timing;
  }
  if (number_teachers && number_teachers.length > 0) {
    where.number_teachers = number_teachers;
  }
  if (physical_activity && physical_activity.length > 0) {
    where.physical_activity = physical_activity;
  }
  console.log('where', where);
  try {
    const count = await Games.count();
    const response = await Games.findAll({ limit, offset, where });
    console.log('response', response);
    const games = response.map(game => {
      return game.dataValues;
    });
    console.log('games', games);
    res.json({ games, count });
  } catch (error) {
    console.error(error);
    res.statusCode(500);
  }
});

app.post('/auth', (req, res, next) => {
  const { token } = req.cookies;

  authService.verify(token, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ msg: 'ACCESS FORBIDDEN' });
    }

    res.setHeader('Set-Cookie', [`token=${token}; HttpOnly`]);
    return res.status(200).json({ username: decodedToken.username, token });
  });
});

app.post('/upload', upload);

app.post('/update/:gameId', update);

app.post('/remove/:gameId', remove);

app.get('/download/:fileId', function (req, res) {
  const fileId = req.params.fileId;
  const file = `${__dirname}./../uploads/${fileId}`;
  res.download(file); // Set disposition and send it.
});

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, './../../client/build', 'index.html'));
// });

app.listen(port, () => {
  console.info(`\n\nExpress listen at http://localhost:${port} \n`);
});
