var User=require('../models/user')
var jwt=require('jwt-simple')
var config=require('../config/dbConfig')

var functions={
    addNew: function(req,res){
        if((!req.body.name)||(!req.body.password)){
            req.json({success: false, msg:'Enter all fields'})
        }
        else{
            var newUser=User({
                name: req.body.name,
                password: req.body.password,
            });
            newUser.save(function (err,newUser){
                if(err){
                    req.json({success: false, msg:'Failed to save'})
                }
                else{
                    req.json({success: true, msg:'User added'})
                }
            })
        }
    },
    authenticate: function(req,res){
        USer.findOne({
            name: req.body.name
    },function(err,user){
        if(err) throw err
        if(!user){
            res.status(403).json({success: false, msg:'User not found'})
        }
        else{
            user.comparePassword(req.body.password,function(err,isMatch){
                if(isMatch && !err){
                    var token=jwt.encode(user,config.secret)
                    res.json({success: true, token: token})
                }
                else
                {
                    return res.status(403).json({success: false, msg:'Incorrect password'})
                }
            })
        }
    })
    },
    getinfo: function(req,res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]=='Bearer'){
            var token=req.headers.authorization.split(' ')[1]
            var decodedtoken=jwt.decode(token,config.secret)
            return res.json({success: true, msg:'Hello'+decodedtoken.name})
    }
    else{
        return res.status(403).json({success: false, msg:'Unauthorized'})
    }

},
}

module.exports=functions