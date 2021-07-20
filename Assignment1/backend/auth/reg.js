const express = require('express')
app = express()
app.use(express.json())
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
let db = null;
MongoClient.connect(url,function(err,client){
    if(err) throw err
    db = client
})

function register(req, res){
    let dbo = db.db("User");
    console.log(req.body);
    let query = {email : req.body.email};
    dbo.collection("Customers").find(query).toArray(function(err,result){
        if(err) throw err;
        else if(result.length >0){
            db.close();
            res.status(401).json("Email already in use")
        }
    })
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let credentials = {name : req.body.name, email : req.body.email}
    req.body.password = hashedPassword;
    dbo.collection("Customers").insertOne(req.body,function(err,res){
        if(err) throw err;
    })
    let token = jwt.sign(credentials,config.secret,{expiresIn : 86400});
    res.status(200).json({auth : true, token : token, message : "User added successfully."})
}

function login(req,res){
    console.log("Arpit\n");
    let token = req.headers['x-access-token'];
    console.log(token);
    if (!token) res.status(401).json("Status unauthorised.");

    jwt.verify(token,config.secret,function(err,decoded){
        if (err)  res.status(500).send({ auth: false, message: 'Status unauthorized' });
    
        res.status(200).send(decoded);
    });
}

module.exports = { register, login };

