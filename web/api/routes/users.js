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

router.get('/:userId/latestHR', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        res.status(200).json(user.heartRates[user.heartRates.length-1]);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/:userId/last10HR', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        let c = 0;
        let hrArray = [];
        while (c < 10) {
            hrArray.push(user.heartRates[user.heartRates.length-(c+1)]);
            c++;
        }
        res.status(200).json(hrArray);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/:userId/last5Steps', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        let c = 0;
        let stepsArray = [];
        while (c < 5) {
            stepsArray.push(user.steps[user.steps.length-(c+1)]['walkStepCount']);
            c++;
        }
        res.status(200).json(stepsArray);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/:userId/latestSteps', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        if (user.steps.length > 0) {
            res.status(200).json(user.steps[user.steps.length-1]);
        } else {
            res.status(404).json({error: 'No data found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/:userId/latestWorkout', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        if (user.workouts.length > 0) {
            res.status(200).json(user.workouts[user.workouts.length-1]);
        } else {
            res.status(404).json({error: 'No data found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/:userId/latestDistance', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        if (user.distance.length > 0) {
            res.status(200).json(user.distance[user.distance.length-1]);
        } else {
            res.status(404).json({error: 'No data found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/:userId/currentPoints', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        res.status(200).json(user.currentPoints);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/:userId/historyPoints', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        res.status(200).json(user.historyPoints);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/:userId/totalPoints', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        const totalObj = {};
        let total = 0;
        total += user.currentPoints;

        (user.historyPoints).forEach(element => {
            total += element.points;
        });

        totalObj['totalPoints'] = total;
        res.status(200).json(totalObj);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/:userId/totalSteps', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        const totalObj = {};
        let totalSteps = 0;
        let totalRunningSteps = 0;
        let totalCalories = 0;

        (user.steps).forEach(element => {
            totalSteps += element.walkStepCount;
        });

        (user.workouts).forEach(element => {
            totalRunningSteps += element.runStepCount;
            totalCalories += element.calories;
        });

        totalObj['totalSteps'] = totalSteps;
        totalObj['totalRunningSteps'] = totalRunningSteps;
        totalObj['calories'] = totalCalories;
        res.status(200).json(totalObj);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.get('/:userId/totalDistance', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        const totalObj = {};
        let totalDistance = 0;

        (user.distance).forEach(element => {
            totalDistance += element.distance;
        });

        totalObj['totalDistance'] = totalDistance;
        res.status(200).json(totalObj);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

// router.get('/:userId/getDiscount', (req, res, next) => {
//     const id = req.params.userId;
//     User.findById(id).then(user => {
//         const totalObj = {};
//         let total = 0;
//         total += user.currentPoints;

//         (user.historyPoints).forEach(element => {
//             total += element.points;
//         });

//         totalObj['totalPoints'] = total;
//         res.status(200).json(totalObj);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//     })
// });

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    const pushOps = {};
    for (const ops of req.body) {
        if (ops.propName == 'steps' || ops.propName == 'workouts' 
        || ops.propName == 'distance' || ops.propName == 'historyPoints' 
        || ops.propName == 'achievements' || ops.propName == 'heartRates') { // push to the array
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

function checkIfEndMonth() {
    User.findById(id).then(user => {
        user.currentPoints = user.currentPoints + 1/100 * steps;
    });
}

router.patch('/:userId/patchSteps', (req, res, next) => {

    // {
    //     "walkStepCount": 5505,
    //     "startTime": 1557954903,
    //     "endTime": 1558034385
    // }
    const id = req.params.userId;

    const pushOps = {};
    
    User.findById(id).then(user => {
        const latestStepsStartTime = user.steps[user.steps.length-1]['startTime'];
        const newStepsStartTime = req.body.startTime;
        const currentPoints = user.currentPoints;

        if (latestStepsStartTime === newStepsStartTime) {
            // remove the last entry and put the newest one
            User.update({ _id: id }, { $pop: {steps: 1} }).then(
                result => {
                    // deleted, now push new result
                    pushOps['steps'] = req.body;
                    User.update({ _id: id }, { $push: pushOps }).then(
                        result => {
                            console.log(result);
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
                }
            );
        } else {
            // just push the newest one
            pushOps['steps'] = req.body;
            User.update({ _id: id }, { $push: pushOps })
            .then(
                result => {
                    User.updateOne({_id: id}, {$set: {currentPoints: currentPoints + 1/100 * req.body.walkStepCount}})
                    .then(updatedPoints => {
                        res.status(200).json(updatedPoints);
                    })
                    .catch( err => {
                        console.log('error on updating points', err);
                    });
                }
            )
            .catch( err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.patch('/:userId/patchWorkout', (req, res, next) => {
    // {
    //     "runStepCount": 5505,
    //     "startTime": 1557954903,
    //     "endTime": 1558034385
    // }
    const id = req.params.userId;

    const pushOps = {};
    
    User.findById(id).then(user => {
        const latestStepsStartTime = user.workouts.length > 0 ? user.workouts[user.workouts.length-1]['startTime'] : 0;
        const newStepsStartTime = req.body['startTime'];
        const currentPoints = user.currentPoints;

        if (latestStepsStartTime === newStepsStartTime) {
            // remove the last entry and put the newest one
            User.update({ _id: id }, { $pop: {workouts: 1} }).then(
                result => {

                    // deleted, now push new result
                    pushOps['workouts'] = req.body;
                    User.update({ _id: id }, { $push: pushOps }).then(
                        result => {
                            console.log(result);
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
                }
            );
        } else {
            // just push the newest one
            pushOps['workouts'] = req.body;
            User.update({ _id: id }, { $push: pushOps })
            .then(
                result => {
                    User.updateOne({_id: id}, {$set: {currentPoints: currentPoints + 1/100 * req.body.runStepCount}})
                    .then( afterPoints => {
                        res.status(200).json(afterPoints);
                    })
                    .catch( err => {
                        console.log('err on updating points', err);
                    })
                }
            )
            .catch( err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.patch('/:userId/patchDistance', (req, res, next) => {
    // {
    //     "distance": 5505,
    //     "startTime": 1557954903,
    //     "endTime": 1558034385
    // }
    const id = req.params.userId;

    const pushOps = {};
    
    User.findById(id).then(user => {
        const latestDistanceStartTime = user.distance.length > 0 ? user.distance[user.distance.length-1]['startTime'] : 0;
        const newDistanceStartTime = req.body['startTime'];

        if (latestDistanceStartTime === newDistanceStartTime) {
            // remove the last entry and put the newest one
            User.update({ _id: id }, { $pop: {distance: 1} }).then(
                result => {

                    // deleted, now push new result
                    pushOps['distance'] = req.body;
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
                }
            );
        } else {
            // just push the newest one
            pushOps['distance'] = req.body;
            User.update({ _id: id }, { $push: pushOps })
            .then(
                result => {
                    console.log(result);
                    res.status(200).json(result);
                }
            )
            .catch( err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
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

// min points 2500 per month for smallest discount
// 2500p -> 2.5%
// 3000p -> 5%
// 3500p -> 7.5%
// 5000p -> 10%
// >5000p -> 15%

module.exports = router;