const mongoose=require("mongoose");
const registerSchema=new mongoose.Schema({
    email: String,
    password: {
        type: String,
        minlength: 6,
    },
  });
  module.exports=mongoose.model('users',registerSchema); 