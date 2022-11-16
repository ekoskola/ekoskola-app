const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const schema = require('./schema/index');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const upload = require('./services/Upload');
const update = require('./services/Update');
const remove = require('./services/Remove');
const authService = require('./services/AuthService');

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

app.use('/graphql', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.post(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false,
  })
);

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

app.get('/download/:fileId', function(req, res) {
  const fileId = req.params.fileId;
  const file = `${__dirname}./../uploads/${fileId}`;
  res.download(file); // Set disposition and send it.
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './../../client/build', 'index.html'));
});

app.listen(port, () => {
  console.info(`\n\nExpress listen at http://localhost:${port} \n`);
});
