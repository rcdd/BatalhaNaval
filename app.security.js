const passport = require('passport');
const database = require('./app.database');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const sha1 = require('sha1');

let security = module.exports = {};
security.passport = passport;

security.initMiddleware = function(server) {
    server.use(passport.initialize());
};

passport.use(new LocalStrategy(function(username, password, done) {
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
        player.token = sha1(player.username+ Date.now());
        database.db.collection('players')
            .updateOne({_id: player._id}, {$set: {token: player.token}})
            .then(r => r.modifiedCount !== 1 ? done(null, false) : done(null, player))
            .catch(err => done(err));
    }).catch(err => done(err));
}));

passport.use(new BearerStrategy(function(token, done) {
    database.db.collection('players')
        .findOne({token: token})
        .then((user) => user ? done(null, user, {scope:'all'}) : done(null, false))
        .catch(err => done(err));
}));

security.authorize = security.passport.authenticate('bearer', { session: false });

function validPassword(player, password) {
    return sha1(password) === player.passwordHash;
}
