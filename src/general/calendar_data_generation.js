/*
This is a simple script that retrieves available for a virtual calendar on a specific date
and randomly populates the calendar with event information for testing purposes.

Refactored for customer on 2.3.2022
*/

const Nylas = require('nylas');
const { default: Event} = require('nylas/lib/models/event')

require('dotenv').config();

const {timestamp_from_date, get_random_int} = require('../utils/common.js')

Nylas.config({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.ACCESS_TOKEN);

async function create_calendar_data() {

    calendars = await nylas.calendars.list()

    
    const availability = await nylas.calendars.availability({
        //Date format is DAY-MONTH-YEAR
        startTime: timestamp_from_date("05-02-2022"),
        endTime: timestamp_from_date("06-02-2022"),
        interval: 30,
        duration: 30,
        calendars: [
            { 
                accountId: "6xypoqoxtpi176cslg0rrujof",
                calendar_ids: [calendars[0].id]
            }
        ]
      });

    for (const time_slot of availability.timeSlots) {

        //Randomly selecting times to add to the calendar.
        //The higher the number past in, the less often events get added.
        // Counting starts at 0, EX: get_random_int(2) will return 0 or 1.
        if(get_random_int(3) === 0) {
            const event = new Event(nylas);

            event.calendarId=`${calendars[0].id}`;

            event.title = 'Fake Event';
            event.location = 'Fake Events House';
            event.description = 'Fake event created for testing purposes';
            event.busy = true;
            event.when.startTime = time_slot.startTime;
            event.when.endTime = time_slot.endTime;

            //You will want to monitor the returned Job Status ID before creating a new event as to make sure you
            //Don't flood the queue and get yourself rate limited by the provider.
            //For virtual calendars, just calling and waiting for .save() to complete is enough as this is a Nylas
            //"Provider"
            await event.save({notify_participants: false});
        }

    }

    await nylas.events.list().then(res => {
        console.log(res)
    })
}



create_calendar_data();