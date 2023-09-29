const Nylas = require('nylas')
const { default: Draft } = require('nylas/lib/models/draft');
require('dotenv').config()

Nylas.config({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.ACCESS_TOKEN);

async function messageTracking(){

    const draft = new Draft(nylas, {
        to: [
            { name: 'Chase', email: 'chase.w@nylas.com' }
        ],
        subject: 'Tracking Demo with Chase 2',
        body: 'This email was sent using the Nylas email API. Visit https://nylas.com for details.'
    });

    await draft.save()

    await draft.send({
        'opens': true,
        'thread_replies': true,
        'payload': "This is a custom payload"
    }).then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });

}

messageTracking();