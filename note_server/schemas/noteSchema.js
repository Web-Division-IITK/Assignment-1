var mongoose = require('mongoose');

const Schema=mongoose.Schema;

const noteSchema = new Schema({
    title:{
        type:"string"
    },
    body: {
        type:"string"
    }
},
    {timestamp:true}
)

const notes=mongoose.model('notes',noteSchema);

module.exports=notes;