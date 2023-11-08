'use strict'
 
var pino = require('pino')()
var express = require('express')

//Create a new express app with two webhook endpoints for POST and GET.
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function logRequest(info) {
    pino.info(info)
}

//Create a POST endpoint for the webhook to send data to.
app.post('/webhook', function (req, res, next) {
    pino.info('Received webhook POST request')
    pino.info({trigger: req.body.type, data: req.body.data})
    res.status(200)
})

//Create a GET endpoint for the webhook to send data to.
app.get('/webhook', function (req, res, next) {
    pino.info('Received webhook GET request')
    pino.info(req.body)
    //Respond with 200 ok and the "challenge" paramter from the request.
    res.status(200).send(req.query.challenge)
})

//Start the server on port 3000
app.listen(3000, function () {
pino.info('Example app listening on port 3000!')
})

