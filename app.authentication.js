/* jshint node: true */
'use strict';
const authentication = module.exports = {};

function login(request, response, next) {
    let player = request.user;
    response.json(player);
    return next();
}

function logout(request, response, next) {
    request.logOut();
    response.json({msg: 'Logout'});
    return next();
}

authentication.init = function(server, options) {
    server.get('/auth/facebook/callback', function(req, res, next){
        options.security.authorizeFacebookCallback(req, res, next); // missing function call
    });
    server.post(options.prefix + 'login', options.security.authorize, login);
    server.post(options.prefix + 'logout', options.security.authorizeBearer, logout);

    server.get('/auth/facebook', function(req, res, next){
        options.security.authorizeFacebook(req, res, next);
        res.redirect('/login', next);
    });



    console.log("Authentication routes registered");
};

