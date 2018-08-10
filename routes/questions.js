'use strict';
const express = require('express');
const { User } = require('../models/users.js');
const LinkedList = require('../linkedlist/linkedlist.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  User.findById(req.user.id)
    .select('questions')
    .then(result => {
      return res.json(result.questions.head.data.wordPair);
    });
});

 
router.put('/', (req, res, next)=>{
  const answer= req.body;
  const userId = req.user.id;
  let correct='';
  User.findById(userId)
    .select('questions')
    .then((result) => {
      let tempList = new LinkedList();
      let tempPointer = result.questions.head;
      while (tempPointer !== null){
        tempList.insertLast(tempPointer.data);
        tempPointer = tempPointer.next;
      }
      if(result.questions.head.data.wordPair.spanish=== answer || result.questions.head.data.wordPair.english=== answer){
        correct='true';
        tempList.setM(true);
        return User.updateOne({_id:userId}, {$set: {'questions':tempList}});
      }
      else{
        correct='false';
        tempList.setM(false);
        return User.updateOne({_id:userId}, {$set: {'questions':tempList}});
      }
    })
    .then(()=>{
      res.send(correct);
    })
    .catch(err => next(err));
});



module.exports = { router };
