/* jshint node: true */
'use strict';
let nodemailer = require('nodemailer');

let transporter =  module.exports = {};
transporter.transport = nodemailer.createTransport('smtps://elopes145%40gmail.com:ze_maneta10@smtp.gmail.com');

transporter.mailInfo = {
    from: '"Batalha naval" <elopes145@gmail.com>', // sender address
    to: 'bar@blurdybloop.com', // list of receivers
    subject: 'Nova palavra passe Batalha naval', // Subject line
    text: 'Hello world 🐴' // plaintext body
};
