var passport = require('passport');
var localStrategy = require('passport-local');
var jwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var config = require('./config')
var user = require('./schemas/users');
// var facebookTokenStrategy = require('passport-facebook-token');
exports.local = passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

exports.getToken=(user)=>{
    return jwt.sign(user,config.secretKey,{expiresIn:10000})
}
var opts={}
console.log('afdb')
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secretKey;
console.log(opts.secretOrKey)
exports.jwtPassport=passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
    console.log(jwt_payload._id)
    user.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        else if (user) {
            return done(null, user)
        }
        else {
            return done(null, false)
        }
    })
}))

exports.verifyUser = passport.authenticate('jwt', { session: false })