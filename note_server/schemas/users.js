var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

let user = new Schema({
    username:{
        type: 'string',
        unique: true,
        required: true,
    },
    password:{
        type: 'string',
        unique: true,
        required: true,
    },
    firstName:{
        type:"string",
        default:""
    },
    lastName:{
        type:"string",
        default:""
    },
})
user.plugin(passportLocalMongoose)
let users = mongoose.model('users', user);
module.exports = users;