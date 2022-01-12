const Nylas = require('nylas')
require('dotenv').config()

//Internal Utilities
const {delay} = require('../utils/common.js')

Nylas.config({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.ACCESS_TOKEN);

/*
==============================================================
Make sure to update these emails before sending.
==============================================================
*/
let messageArray = [
    {
        body : "Sounds great! See you then.",
        subject: "Meeting Test",
        to: [
            {
                name: "Chase",
                email: "EMAIL_HERE"
            }
        ]
    },
    {
        body : "Hey everyone, I won't be at standup",
        subject: "Standup",
        to: [
            {
                name: "Nick",
                email: "EMAIL_HERE"
            },
            {
                name: "Jamie",
                email: "EMAIL_HERE"
            }
        ]
    },
    {
        body : "Hey, can you hop on this meeting with a customer to troubleshoot their integration?",
        subject: "Customer Meeting",
        to: [
            {
                name: "Elijah",
                email: "EMAIL_HERE"
            },
            {
                name: "Tayyab",
                email: "EMAIL_HERE"
            }
        ]
    }
]

async function ExponentialBackoffSending(messageQueue) {

    let attempts = 0;

    for(let i=0; i < messageQueue.length; i++) {

        const draft = nylas.drafts.build(messageQueue[i]);

        console.log("Attempting to send")

        await draft.send().then(res => {
            console.log(res);
        })
        .catch(async err => {
            console.log("Failed to send message: " + err);
            attempts++;

            //Checking the number of attempts (only retrying a message 5 times)
            //Then Calculating delay between attempts
            if(attempts < 5) {
                i--;
                await delay(1000 * Math.pow(2, attempts));
            }
        })

    }
}

ExponentialBackoffSending(messageArray);