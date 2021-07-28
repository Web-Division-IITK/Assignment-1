var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: "string"
    },
    body: {
        type: "string"
    },
    important: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},
    { timestamp: true }
)

const notes = mongoose.model('notes', noteSchema);

module.exports = notes;