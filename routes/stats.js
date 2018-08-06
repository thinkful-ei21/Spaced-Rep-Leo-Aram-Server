const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Stats } = require('../models/stats');


const router = express.Router();
const jsonParser = bodyParser.json();


/* ========== GET ALL ========== */
router.get('/', (req, res, next) => {
    const userId = req.user.id;
    let filter = { userId };
    Stats.find(filter)
        .sort({ updatedAt: 'desc' })
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            next(err);
        });
});


/* ========== POST ========== */
router.post('/', jsonParser, (req, res, next) => {
    const { difficulty, score, percentage } = req.body;
    const userId = req.user.id;
    const newStats = { difficulty, score, percentage, userId };

    if (!difficulty) {
        const err = new Error('Missing `difficulty` in request body');
        err.status = 400;
        return next(err);
    }

    Stats.create(newStats)
        .then(result => {
            return res.status(201).json(result.serialize());
        })
        .catch(err => {
            next(err);
        });
});

/* ========== PUT ========== */
router.put('/:id', jsonParser, (req, res, next) => {
    console.log(req.body);
    const { id } = req.params;
    const { difficulty, score, percentage } = req.body;
    const userId = req.user.id;
    const updateStats = { difficulty, score, percentage, userId };

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('The `id` is not valid');
        err.status = 400;
        return next(err);
    }

    if (!difficulty) {
        const err = new Error('Missing `difficulty` in request body');
        err.status = 400;
        return next(err);
    }
    Stats.findByIdAndUpdate(id, updateStats, { new: true })
        .then(result => {
            if (result) {
                res.json(result);
            } else {
                next();
            }
        })
        .catch(err => {
            next(err);
        });
});

module.exports = { router };