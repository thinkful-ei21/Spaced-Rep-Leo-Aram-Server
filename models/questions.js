const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  spanish: { type: String },
  english: { type: String }
});

questionSchema.set('timestamps', true);

questionSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

questionSchema.methods.serialize = function(){
  return{
    id: this._id,
    spanish: this.spanish ,
    english: this.english ,

  };
};


const Question = mongoose.model('Question', questionSchema);

module.exports = { Question };