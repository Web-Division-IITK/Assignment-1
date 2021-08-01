const bcrypt = require('bcryptjs');
const config = require('../config.json')
const checkEmail = require('./view').checkEmail;

var MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
var url = "mongodb+srv://Arpitkr:Arpit299792458@cluster0.z2ut1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let db = null;
MongoClient.connect(url,function(err,client){
    if(err) throw err
    db = client
})

async function login(req,res){
    let dbo = db.db("User");
    let result = await checkEmail(req.body.email,dbo,res);
    if(result.check){
        if(!bcrypt.compareSync(req.body.password,result.result[0].password)){
            return res.status(401).json({"msg":"Invalid password"});
        }
        let token = jwt.sign({email: req.body.email},config.secret,{expiresIn : 60});
        return res.status(200).json({"auth" :true,"msg":"User logged in successfully","token":token});
    }
}

module.exports = login;
