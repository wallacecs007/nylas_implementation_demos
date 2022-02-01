const Nylas = require('nylas')
require('dotenv').config()

Nylas.config({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.ACCESS_TOKEN);

nylas.messages.find("MESSAGE_ID").then( message => {

    let folder;

    nylas.folders.list().then(folders => {

        folder = folders.find(o => o.displayName === "Archive"); // This is getting the Archive Folder

        message.folder = {id: folder.id};

        console.log(message);

        message.save().then(res => {
            console.log(res.folder);
        })

    })

})