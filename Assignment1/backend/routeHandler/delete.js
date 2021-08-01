var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
var url = "mongodb+srv://Arpitkr:Arpit299792458@cluster0.z2ut1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
        result[0].notes.splice(index,1);
        await dbo.collection("Customers").updateOne({email : req.body.email},{$set : {notes : result[0].notes}});
        res.status(200).json({"data":result[0].notes,"msg":"Deleted successfully"});
    }
    return res.status(400);
}

module.exports = deleteNote;