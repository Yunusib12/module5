const routes = require('express').Router()



routes
    .route('/')
    .get((req, res) => {

        res.send("First Routes");
    });







module.exports = routes