'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const { dbConnect } = require('./db-mongoose');

const { PORT, CLIENT_ORIGIN} = require('./config');

const { router: usersRouter } = require('./routes/users');
const { router: questionsRouter } = require('./routes/questions');
const { router: authRouter, localStrategy, jwtStrategy } = require('./passport/index');

mongoose.Promise = global.Promise;

const app = express();


// Logging
app.use(morgan('common'));

// Create a static webserver
app.use(express.static('public'));


app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);


// Utilize the given `strategy`
passport.use(localStrategy);
passport.use(jwtStrategy);

// Protect endpoints using JWT Strategy
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });
app.use(bodyParser.json());
app.use(bodyParser.text());
// Mount routers
app.use('/api/questions', jwtAuth, questionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
