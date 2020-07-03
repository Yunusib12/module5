const routes = require('express').Router()
const dbController = require('../controllers/dbController');
const { route } = require('.');

//Add a User
routes
    .route('/adduser')
    .post(dbController.addUser);

// Get a User
routes
    .route('/user/:id')
    .get(dbController.getUser);

// Get all User
routes
    .route('/users')
    .get(dbController.getAllUSer);

//Get Products
routes
    .route('/product')
    .get(dbController.getAllProduct);

//Get All Orders 
routes
    .route('/orders')
    .get(dbController.getAllOrders);

//Get a User Order
routes
    .route('/order/:id')
    .get(dbController.getUserOder);

//Add Order
routes
    .route('/addorder')
    .post(dbController.addOrder);

//Add Products
routes
    .route('/addproduct')
    .post(dbController.addProduct);

module.exports = routes