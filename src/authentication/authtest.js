const Nylas = require('nylas')
require('dotenv').config()

Nylas.config({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

async function auth_call() {

    let code;

    await Nylas.connect.authorize({
        name: 'Nyla The Cheetah',
        email_address: process.env.EMAIL_ADDRESS,
        //Or other supported providers. Check https://developer.nylas.com/docs/api/#post/connect/authorize for more info
        provider: 'outlook', 
        settings: {
            username: process.env.EMAIL_ADDRESS,
            password: process.env.EMAIL_PASSWORD,
            eas_server_host: "outlook.com"
        },
        scopes: 'email.read_only,calendar.read_only,contacts.read_only'
    }).then(res => {
        code = res.code;
    })
    .catch(err => {
        console.log("Error: " + err);
    });    

    let access_token;

    await Nylas.connect.token(code).then(res => {
        access_token = res.access_token;
    })
    .catch( err => {
        console.log("Error :" + err)
    });

    const nylas = Nylas.with(access_token)

    nylas.account.get().then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log("Error: " + err)
    })

}

auth_call();