var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/userSchema');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify token


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, process.env.SESSION_SECRET, { expiresIn: 3600 });
};
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "ahsdjhasdhagsjdgajsdgjhagsdjhgasdhgajhsgdjhagsdhgasd";

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}).then((res)=>{
            if(res)
                return done(null, res);
            else
                return done(null, false);
        })
        .catch((err)=>{
            return done(err, false);
        })
    }));
exports.verifyUser = passport.authenticate('jwt', { session: false });