const checkEmail = require('./view').checkEmail;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
let db = null;
MongoClient.connect(url,function(err,client){
    if(err) throw err
    db = client
})

async function addNotes(req,res){
    let dbo = db.db("User");
    let result = await dbo.collection("Customers").find({email : req.body.email}).toArray();

    if(result[0].notes){
        result[0].notes.push(req.body.data);
        await dbo.collection("Customers").updateOne({email : req.body.email},{$set : {notes : result[0].notes}});
    }
    else{
        await dbo.collection("Customers").updateOne({email : req.body.email},{$set : {notes : new Array(req.body.data)}});
    }
    return res.status(200).json({"msg" : "Notes added successfully"});
}

module.exports = addNotes;