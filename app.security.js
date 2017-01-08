/* jshint node: true */
'use strict';
const passport = require('passport-restify');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const sha1 = require('sha1');
const database = require('./app.database');


const salt ="e3r_.jsya@54";

let security = module.exports = {};
security.salt = salt;
security.passport = passport;

security.initMiddleware = function (server) {
    server.use(passport.initialize());
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function (username, password, done) {
    database.db.collection('players').findOne({
        username: username
    }).then(player => {
        if (player === null) {
            return done(null, false, {
                message: 'Incorrect credentials.'
            });
        }
        if (!validPassword(player, password)) {
            return done(null, false, {
                message: 'Incorrect credentials.'
            });
        }
        player.token = sha1(player.username + Date.now()+salt);
        database.db.collection('players')
        .updateOne({ _id: player._id }, { $set: { token: player.token } })
        .then(r => r.modifiedCount !== 1 ? done(null, false) : done(null, player))
        .catch(err => done(err));
    }).catch(err => done(err));
}));

passport.use(new BearerStrategy(function (token, done) {
    database.db.collection('players')
    .findOne({ token: token })
    .then((user) => user ? done(null, user, { scope: 'all' }) : done(null, false))
    .catch(err => done(err));
}));

passport.use(new FacebookStrategy({
    clientID: 1350121471728215,
    clientSecret: '4cf0f852be8d6c98fee9765d2a694c25',
    callbackURL: "http://bn.dev:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
    },function(accessToken, refreshToken, profile, done) {
        console.log("conseguiu aceder");
        console.log(accessToken);

     database.db.collection('players').findOne({
        'token': sha1(profile.id+salt)
    }, function(err, player) {
        if (err) {
            return done(err);
        }
            console.log(player);
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!player) {
                    let newPlayer = {};

                   // newPlayer._id = "678544e5678654";
                    newPlayer.name = profile.displayName;
                    newPlayer.username = profile.id;
                    newPlayer.email = profile.id+"@facebook.com";
                    newPlayer.passwordHash = sha1(accessToken+salt);
                    newPlayer.token = sha1(profile.id+salt);
                    newPlayer.photo = profile.photos[0].value;
                    newPlayer.totalVictories = 0;

                    console.log("player");
                    console.log(newPlayer);
                    database.db.collection('players')
                    .insertOne(newPlayer);
                    console.log(err);
                    return done(err, newPlayer);
                } else {
                    console.log("user found");
                    //found user. Return
                    return done(err, player);
                }
            });
    }
));

security.authorize = security.passport.authenticate('local', { session: false });
security.authorizeBearer = security.passport.authenticate('bearer', { session: false });
security.authorizeFacebook = security.passport.authenticate('facebook');

security.authorizeFacebookCallback = security.passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/login' });


function validPassword(player, password) {
    return sha1(password+salt) === player.passwordHash;
}
