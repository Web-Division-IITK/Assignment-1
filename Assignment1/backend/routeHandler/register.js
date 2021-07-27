const bcrypt = require('bcryptjs');
const config = require('../config.json')

var MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
var url = "mongodb://localhost:27017/";
let db = null;
MongoClient.connect(url,function(err,client){
    if(err) throw err
    db = client
})


async function register(req,res){
    let dbo = db.db("User");
    let query = {email : req.body.email};
    let result = await dbo.collection("Customers").find(query).toArray();
    if(result.length>0){
        return res.status(401).json({"msg": "Email already in use"});
    }
    let hashedPassword = bcrypt.hashSync(req.body.password,8);
    req.body.password = hashedPassword;
    let data = {email : req.body.email, password : req.body.password}
    await dbo.collection("Customers").insertOne(data);
    let token = jwt.sign({email: req.body.email},config.secret,{expiresIn : 86400});
    return res.status(200).json({"auth" :true,"msg":"User added successfully","token":token});
}

module.exports = register;