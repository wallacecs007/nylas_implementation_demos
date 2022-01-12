const Nylas = require('nylas')
require('dotenv').config()

Nylas.config({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});
