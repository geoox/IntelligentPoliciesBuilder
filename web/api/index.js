const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/users");
const cors = require('cors');

app.use(cors());

let dbPassword = 'Theadr3naline!';

let port = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://georgedobrin:' + dbPassword + '@node-rest-policies-jwe2o.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsWhitelist = [
    'https://in-fit.herokuapp.com/',
    'http://localhost:8080/',
    'http://localhost:8100/',
    'http://localhost:3000/'
]

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    if(corsWhitelist.indexOf(req.headers.origin)!== -1){
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept, Authorization');
    }
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET, PUT, POST, PATCH, DELETE');
        res.status(200).json({});
    }
    next();
})

app.use("/users", users);


app.listen(port, ()=> console.log("Listening to 8080..."));