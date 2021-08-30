const mongoose = require('mongoose')
const signUpSchema = new mongoose.Schema(
{
    name: {
    type: String
    // required: true
},
    password: {
    type: String
    // required: true
},
    email: {
    type: String
    // required: true
}
});
const Signup = mongoose.model('Signup', signUpSchema);

module.exports = Signup;