const MongoClient = require('mongodb').MongoClient;
const db = module.exports = {};

var players = [
    {
        name: 'Administrator',
        username: 'admin',
        passwordHash: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
        avatar: 'https://api.adorable.io/avatars/285/admin.png',
        totalVictories: 12
    }];

db.connect = function (url, callback) {
    MongoClient
        .connect(url)
        .then(database => {
            console.log('Connection established to', url);
            db.db = database;
            callback();
        })
        .catch(console.error);
};
