const routes = require('express').Router();
const apiRoute = require('./apiRoute');


routes.use('/api', apiRoute);


module.exports = routes