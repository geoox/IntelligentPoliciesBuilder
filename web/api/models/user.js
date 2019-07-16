const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    birthDate: Date,
    email: String,
    password: String,
    height: Number,
    weight: Number,
    watchPin: Number,
    heartRates: [
      {
        // date: Date,
        // heartRate: Number
      }
    ],
    gender: {
      type: String,
      enum: ['Male', 'Female']
    },
    steps: [
      {
        // date: Date,
        // numberSteps: Number,
        // totalTime: Number
      }
    ],
    workouts: [
      {
        // date: Date,
        // type: String,
        // totalTime: Number
      }
    ],
    distance:[
      {
        // timestamp: Date,
        // distance: Number
      }
    ],
    achievements:[
      {
        // name: String,
        // tsAchieved: Date
      }
    ],
    currentPoints: Number,
    historyPoints: [
      {
        // totalPoints: Number,
        // tsStart: Date,
        // tsEnd: Date
      }
    ],
    insurancePlan: {
      // tsStart: Date,
      // tsEnd: Date,
      // monthlyFee: Number
    }
});

module.exports = mongoose.model('User', userSchema);
/*
{
    "users":{
      "name": "Name",
      "birthDate":"",
      "email":"",
      "height":"",
      "weight":"",
      "gender":"",
      "heartRate":[],
      "steps":[
        {
          "date":"",
          "numberSteps":"",
          "totalTime":""
        }
      ],
      "workouts":[
        {
          "date":"",
          "totalTime":"",
          "type":""
        }  
      ],
      "sleep":[
        {
          "ts":"",
          "totalTime":""
        }
      ],
      "achievements":[
        {
          "name":"",
          "tsAchieved":""
        }
      ],
      "currentPoints":{
          "totalPoints":"",
          "tsStart":"",
          "tsEnd":""
      },
      "historyPoints":[
        {
          "totalPoints":"",
          "tsStart":"",
          "tsEnd":""
        }
      ],
      "insurancePlan":{
        tsStart:"",
        tsEnd:"",
        monthlyFee:""
      }
    }
  
  }
  */