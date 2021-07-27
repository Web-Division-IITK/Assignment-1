var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
let db = null;
MongoClient.connect(url,function(err,client){
    if(err) throw err
    db = client
})

async function deleteNote(req,res){
    let dbo = db.db("User");
    let result = await dbo.collection("Customers").find({email: req.body.email}).toArray();
    let index = parseInt(req.body.index);
    if(result[0].notes[index]){
        result[0].notes.splice[index-1,1];
        await dbo.collection("Customers").updateOne({email : req.body.email},{$set : {notes : result[0].notes}});
        res.status(200).redirect('/view');
    }
    return res.status(400);
}

module.exports = deleteNote;