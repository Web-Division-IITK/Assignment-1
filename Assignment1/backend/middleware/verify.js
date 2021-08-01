const jwt = require('jsonwebtoken');
const config = require('../config.json');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Arpitkr:Arpit299792458@cluster0.z2ut1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let db = null;
MongoClient.connect(url,function(err,client){
    if(err) throw err
    db = client
})
const checkEmail = require('../routeHandler/view').checkEmail;

async function verify(req,res,next){
    let dbo = db.db('User');
    let result = await checkEmail(req.body.email,dbo,res);
    if(!result.check){
        return;
    }
    if (!req.headers['authorization']){
        return res.status(401).json({"auth":false,"msg": "Status unauthorised"});
    }
    let token = req.headers['authorization'].split(' ')[1];
    if (!token){
        return res.status(401).json({"auth":false,"msg": "Status unauthorised"});
    }
    try{
        let payload = jwt.verify(token,config.secret);
    }catch(err){
        return res.status(401).json({"auth":false,"msg": "Status unauthorised."});
    }
    next();
}

module.exports = verify;