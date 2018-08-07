const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  difficulty: { type: String, required: true },
  spanish: { type: String, required: true },
  english: { type: String, required: true }
});

questionsSchema.set('timestamps', true);

questionsSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});


const Questions = mongoose.model('Questions', questionsSchema);

module.exports = { Questions };