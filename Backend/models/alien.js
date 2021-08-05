const mongoose=require('mongoose')

const alienSchema=new mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    important:{
        type:Boolean,
        default:false
    },
    performed:{
        type:Boolean,
        default:false
    },
    work:{
        type:Boolean,
        default:false
    },
    home:{
        type:Boolean,
        default:false
    },
    others:{
        type:Boolean,
        default:false
    },
    
})

module.exports=mongoose.model('Alien',alienSchema)