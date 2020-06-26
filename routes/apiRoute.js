const routes = require('express').Router()
const dbController = require('../controllers/dbController');

//Add a User
routes
    .route('/adduser')
    .post(dbController.addUser);

// Get all User
routes
    .route('/user')
    .get(dbController.getUSer);

//Get all Available Products
routes
    .route('/product')
    .get(dbController.getproduct);









module.exports = routes