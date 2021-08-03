var express = require('express');
var router = express.Router();
const { MongoClient, }  = require('mongodb');
const uri =
      "mongodb+srv://Harshit:harsh2003@cluster0.p41mc.mongodb.net/noteit?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.get('/',async (req, res)=>{
  res.send("welcome to Server");
  await client.connect();
})
router.get('/create-user/:id', 
          async function(req, res){
            try{
         
              const db = client.db('noteit');
              const notesData = db.collection('notes_data');
              const doc = {
                userId: req.params.id,
                notes: [
                  {
                    title: "Welcome Note",
                    text: "Welcome to NoteIt!"
                  }
                ]
              }
              await notesData.insertOne(doc);
              res.status(200).send('User created successfully');

            }catch(error){
              console.log(error);
              res.status(500).send('User creation failed');
            }
            
          })
router.post('/add-note/:uid', 
          async function(req, res){
            try{
              
              const db = client.db('noteit');
              const notesData = db.collection('notes_data');
              const query = {userId:req.params.uid}
              const options = {
                projection: { notes:1}
              }
              const userData  = await notesData.findOne(query, options);
              let notes = userData.notes;
              const text = req.body.text;
              const title = req.body.title;
              notes.push({
                title: title,
                text: text
              })
              await notesData.updateOne(query, {$set:{notes:notes}});
              res.status(200).send({notes:notes}).end();
            }catch(error){
              console.log(error);
              res.status(500)
            }
            
          })
router.get('/get-notes/:id', async function(req, res){
  try{
    console.log('connected');
    const db = client.db('noteit');
    const notesData = db.collection('notes_data');
    console.log("db loaded");
    const query = {userId:req.params.id}
    const options = {
      projection: {_id: 0, notes:1}
    }
    const userData  = await notesData.findOne(query, options);
    console.log(userData)
    if(userData === null){
      res.sendStatus(404);
    }
    console.log(userData);
    res.send(userData)

  }catch(error){
    console.log(error);
    res.status(500);
  }
  
})
router.post('/update-note/:uid/:noteId', async function(req, res){
  try{

    const db = client.db('noteit');
    const notesData = db.collection('notes_data');
    const query = {userId:req.params.uid}
    const options = {
      projection: { notes:1}
    }
    const userData  = await notesData.findOne(query, options);
    let notes = userData.notes;
    notes[req.params.noteId]= req.body;
    await notesData.updateOne(query, {$set:{notes:notes}});
    res.status(200).send({notes:notes}).end();
  }catch(error){
    console.log(error);
    res.status(500)
  }
  
})
router.get('/delete/:uid/:noteId', async function(req, res){
  try{

    const db = client.db('noteit');
    const notesData = db.collection('notes_data');
    const query = {userId:req.params.uid}
    const options = {
      projection: { notes:1}
    }
    const userData  = await notesData.findOne(query, options);
    let notes = userData.notes;
    notes.splice(req.params.noteId,1)
    await notesData.updateOne(query, {$set:{notes:notes}});
    res.status(200).send({notes:notes}).end();
  }catch(error){
    console.log(error);
    res.status(500)
  }


}
)
router.get('/close', async (req, res)=>{
  
  await client.close();
  res.send("Server is closed");
})
module.exports = router;
