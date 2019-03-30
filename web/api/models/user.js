const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    points: Number
})

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
      "sleeps":[
        {
          "date":"",
          "totalTime":""
        }
      ],
      "achievements":[
        {
          "name":"",
          "isAchieved":""
        }
      ],
      "points":{
        "currentPoints":"",
        "historyPoints":[
          {
            "totalPoints":"",
            "tsStart":"",
            "tsEnd":""
          }
        ]
      },
      "insurancePlan":{
        
      }
    }
  
  }
  */