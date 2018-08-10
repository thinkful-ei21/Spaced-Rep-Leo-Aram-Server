'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');

const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./config');

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

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
