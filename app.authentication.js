/* jshint node: true */
'use strict';
const authentication = module.exports = {};
const database = require('./app.database');
const security = require('./app.security');
const sha1 = require('sha1');
const mail = require('./app.mail');


function login(request, response, next) {
    let player = request.user;
    response.json(player);
    return next();
}

function logout(request, response, next) {
    request.logOut();
    response.json({ msg: 'Logout' });
    return next();
}

function recover(request, response, next) {
    let username = request.body.username;
    var password = Math.random().toString(36).slice(-8);

    console.log(mail);
    database.db.collection('players').findOne({
        username: username
    }).then(player => {
        if (player === null) {
            return response.json({ msg: 'error' });
        }
        database.db.collection('players')
            .updateOne({ _id: player._id }, { $set: { passwordHash: sha1(password + security.salt) } })
            .then(r => {
                if (r.modifiedCount !== 1) {
                    response.json({ msg: 'error' });
                } else {
                    console.log("a bombar");
                    mail.mailInfo.to = player.email;
                    mail.mailInfo.text = 'A tua nova password é:' + password;
                    console.log(mail.mailInfo);
                    mail.transport.sendMail(mail.mailInfo, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            })
            .catch(response.json({ msg: 'error' }));
    }).catch(response.json({ msg: 'error' }));
    response.json({ msg: 'done' });
    return next();
}

authentication.init = function (server, options) {
    server.get('/auth/facebook/callback', function (req, res, next) {
        options.security.authorizeFacebookCallback(req, res, next); // missing function call
    });
    server.post(options.prefix + 'login', options.security.authorize, login);
    server.post(options.prefix + 'logout', options.security.authorizeBearer, logout);

    server.get('/auth/facebook', function (req, res, next) {
        options.security.authorizeFacebook(req, res, next);
        res.redirect('/login', next);
    });

    server.post(options.prefix + 'recover', recover);

    console.log("Authentication routes registered");
};
