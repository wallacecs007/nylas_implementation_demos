const Nylas = require('nylas')
const {default: NativeAuthenticationProvider, default: Scope} = require('nylas/lib/models/connect')

require('dotenv').config()

Nylas.config({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

async function auth_vc() {

    // Authenticate a virtual calendar
    Nylas.connect.authorize({
        clientId: process.env.CLIENT_ID,
        name: "Virtual Calendar",
        emailAddress: "Chases Test VC NodeJS"
    }).then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log("Error: " + err)
    })

}

auth_vc()