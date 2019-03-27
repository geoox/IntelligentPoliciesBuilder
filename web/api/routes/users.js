const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

// Handle incoming GET requests to /users
router.get('/', (req, res, next) => {
    User.find().exec().then(resp=>{
        res.status(200).json(resp);
    })
    .catch(err => {
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
        points: req.body.points
    });
    newObj.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Post request to /users',
            createdUser: newObj
        });
    })
    .catch(err=>{
        console.log(err);
    });

})

module.exports = router;