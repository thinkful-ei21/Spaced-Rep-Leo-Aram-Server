'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// 3 Sections
// Beg 
// Int 
// Adv

// Word 
// Translation

// Question
// Answer Input

// Session Local

// Beg 1
// 8/10

// Beg 2


//section 1 =intro
//seciton 2 =basic    user:id1 8/10   user:id2  0/10  
// 1/15
// [0,0,0,0,0,0,0,0,0]

const UserSchema = mongoose.Schema({
  username: {type: String,required: true,unique: true},
  password: {type: String,required: true},
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' }
});

UserSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.password;
  }
});

UserSchema.methods.serialize = function () {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    id: this.id || ''
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };