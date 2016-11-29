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
    server.post(options.prefix + 'login', options.security.passport.authenticate('local', {'session':false}), login);
    server.post(options.prefix + 'logout', options.security.authorize, logout);
    console.log("Authentication routes registered");
};
