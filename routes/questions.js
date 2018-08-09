'use strict';
const express = require('express');
const { User } = require('../models/users.js');
const passport = require('passport');
const LinkedList = require('../linkedList/linkedList.js');

const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth, (req, res, next) => {
  User.findById(req.user.id)
    .select('questions')
    .then(result => {
      return res.json(result.questions.head.data.wordPair);
    });
});

router.get('/correct', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .select('questions')
    .then((result) =>{

      let tempList = new LinkedList();
      let tempPointer = result.questions.head;
      while (tempPointer !== null) {
        tempList.insertLast(tempPointer.data);
        tempPointer = tempPointer.next;
      }

      tempList.setM(true);
      return User.updateOne({_id:userId}, {$set: {'questions':tempList}})
        .then(data=>{
          res.status(204).json(data);
        });
    })
    .catch(err => next(err));

});
router.get('/wrong',jwtAuth, (req, res, next)=>{
  const userId = req.user.id;
  User.findById(userId)
    .select('questions')
    .then((result)=>{
      let tempList = new LinkedList();
      let tempPointer = result.questions.head;
      while (tempPointer !== null){
        tempList.insertLast(tempPointer.data);
        tempPointer = tempPointer.next;
      }
      tempList.setM(false);
      return User.updateOne({_id:userId}, {$set: {'questions':tempList}});
    })
    .then(data=>{
      res.status(204).json(data);
    })
    .catch(err => next(err));
});



router.put('/',jwtAuth, (req, res, next)=>{
  const answer= req.body;
  console.log(req.body);
  const userId = req.user.id;
  User.findById(req.user.id)
    .select('questions')
    .then((result) => {
      let tempList = new LinkedList();
      let tempPointer = result.questions.head;
      while (tempPointer !== null){
        tempList.insertLast(tempPointer.data);
        tempPointer = tempPointer.next;
      }
      console.log(result.questions.head.data.wordPair);
      if(result.questions.head.data.wordPair=== answer || result.questions.head.data.wordPair=== answer){
        tempList.setM(true);
        User.updateOne({_id:userId}, {$set: {'questions':tempList}});
        return true;
      }
      else{
        tempList.setM(false);
        User.updateOne({_id:userId}, {$set: {'questions':tempList}});
        return false;
      }
    })
    .then(data=>{
      console.log(data);
      res.status(204).json(data);
    })
    .catch(err => next(err));
});



module.exports = { router };
