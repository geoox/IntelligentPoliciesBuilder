const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/users");

let dbPassword = 'Theadr3naline!';

mongoose.connect('mongodb+srv://georgedobrin:' + dbPassword + '@node-rest-policies-jwe2o.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET, PUT, POST, PATCH, DELETE');
        res.status(200).json({});
    }
    next();
})

app.use("/users", users);


app.listen(8080, ()=> console.log("Listening to 8080..."));