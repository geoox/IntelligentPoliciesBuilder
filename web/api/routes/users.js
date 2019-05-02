const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

// Handle incoming GET requests to /users
router.get('/', (req, res, next) => {
    User.find().exec().then(resp => {
        res.status(200).json(resp);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    const pushOps = {};
    for (const ops of req.body) {
        if (ops.propName == 'steps' || ops.propName == 'workouts' 
        || ops.propName == 'sleep' || ops.propName == 'historyPoints' 
        || ops.propName == 'achievements') { // push to the array
            pushOps[ops.propName] = ops.value;
        } else {
            updateOps[ops.propName] = ops.value;
        }
    }
    User.update({ _id: id }, { $set: updateOps }).then(
        result => {
            console.log(result);
            res.status(200).json(result);

            // success => start pushing to arr elements
            User.update({ _id: id }, { $push: pushOps }).then(
                result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch( err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


});

router.post('/', (req, res, next) => {
    const newObj = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        birthDate: req.body.birthDate,
        email: req.body.email,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
        steps: req.body.steps,
        workouts: req.body.workouts,
        sleep: req.body.sleep,
        achievements: req.body.achievements,
        currentPoints: req.body.currentPoints,
        historyPoints: req.body.historyPoints,
        insurancePlan: req.body.insurancePlan
    });
    newObj.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Successful POST request to /users',
            createdUser: newObj
        });
    })
    .catch(err=>{
        console.log(err);
    });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id }).exec().then( result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;