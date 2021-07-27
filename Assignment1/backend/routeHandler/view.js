var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
let db = null;
MongoClient.connect(url,function(err,client){
    if(err) throw err
    db = client
})

async function checkEmail(email,dbo,res){
    let result = await dbo.collection("Customers").find({email : email}).toArray();
    if(result.length == 0){
        res.status(400).json({"msg" : `${email} is not registered`});
        return {check : false, result : result};
    }
    return {check : true, result : result};
}


//This end point receives a post request containing the email and noteID of user and returns the corresponding note in json format 
async function view(req,res){
    let dbo = db.db("User");
    let result = await dbo.collection("Customers").find({email : req.body.email}).toArray();
    
    res.status(200).json({"data" : result[0].notes});
}

module.exports = {view,checkEmail};