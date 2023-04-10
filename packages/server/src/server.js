const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const upload = require('./services/Upload');
const update = require('./services/Update');
const remove = require('./services/Remove');
const authService = require('./services/AuthService');

const Games = require('./db/models/Game');
const Users = require('./db/models/Users');

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

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Server is healthy',
  });
});

app.post('/api/login', async (req, res, next) => {
  const expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send('Invalid username or password');
  }

  const token = authService.issue({
    username,
  });
  res.cookie('token', token, { expires: expirationDate, httpOnly: true });
  return res.status(200).json({ token });
});

app.post('/api/logout', (req, res, next) => {
  res.cookie('token', null, { httpOnly: true });
  return res.status(200).json({});
});

app.get('/api/game/:id', async (req, res, next) => {
  const { id } = req.params;

  const response = await Games.findOne({
    where: {
      id,
    },
  });
  res.json(response.dataValues);
});

app.post('/api/game/:id/vote', async (req, res, next) => {
  const { id } = req.params;
  const { rating } = req.body;

  const previousGame = await Games.findOne({
    where: {
      id,
    },
  });

  const response = await Games.update(
    {
      votes_value: previousGame.votes_value + rating,
      votes_count: previousGame.votes_count + 1,
    },
    {
      where: {
        id,
      },
    },
  );
  console.log('response', response);
  res.json(response.dataValues);
});

app.get('/api/game', async (req, res, next) => {
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
  } = req.query;

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
  try {
    const response = await Games.findAll({ limit, offset, where });
    const games = response.map(game => {
      return game.dataValues;
    });
    res.json({ games, count: games.length });
  } catch (error) {
    console.error(error);
    res.statusCode(500);
  }
});

app.post('/api/auth', (req, res, next) => {
  const { token } = req.cookies;

  return res.status(200).json({ username: 'test', token: 'test' });

  authService.verify(token, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ msg: 'ACCESS FORBIDDEN' });
    }

    res.setHeader('Set-Cookie', [`token=${token}; HttpOnly`]);
    return res.status(200).json({ username: decodedToken.username, token });
  });
});

app.post('/api/upload', upload);

app.post('/api/update/:gameId', update);

app.post('/api/remove/:gameId', remove);

app.get('/api/download/:fileId', function (req, res) {
  const fileId = req.params.fileId;
  const file = path.join(__dirname, `../uploads/${fileId}`);
  res.download(file); // Set disposition and send it.
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './../../client/build', 'index.html'));
});

app.listen(port, () => {
  console.info(`\n\nExpress listen at http://localhost:${port} \n`);
});
