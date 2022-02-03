
//Timeout function
const delay = ms => new Promise(res => setTimeout(res, ms));

//Timestamp for date from string
const timestamp_from_date = (date) => {

    myDate = date.split("-");
    var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
    return newDate.getTime()/1000;

}

const get_random_int = max => {
    return Math.floor(Math.random() * max);
  }

module.exports = {
    delay,
    timestamp_from_date,
    get_random_int
}