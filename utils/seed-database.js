const mongoose = require('mongoose');
const DATABASE_URL = 'mongodb://leoveres:dev123@ds115022.mlab.com:15022/spaced-rep-database';
const { Questions } = require('../models/questions');
const seedQuestions = require('../DB/questions');

// console.log(Questions);

mongoose.connect(DATABASE_URL)
  .then(() => {
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    return Questions.insertMany(seedQuestions);
  })
  .then(() => mongoose.disconnect())
  .catch(err => { console.error(err); });
