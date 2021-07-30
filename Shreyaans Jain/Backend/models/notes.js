const mongoose = require('mongoose')
const notesSchema = new mongoose.Schema(
{
    date: {
    type: Date,
    required: true
},
    notes: {
    type: String,
    required: true
}
});
const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;

