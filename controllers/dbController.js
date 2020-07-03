const db = require('../models');
const e = require('express');
const { ObjectId } = require('mongodb');

const dbController = {

    addUser: (req, res) => {

        db.User.create(req.body, (err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    addOrder: (req, res) => {
        db.Order.create(req.body, (err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    addProduct: (req, res) => {
        db.Product.create(req.body, (err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    getUser: (req, res) => {
        db.User.findOne({ _id: req.params.id }, (err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    getAllUSer: (req, res) => {
        db.User.find((err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    getAllProduct: (req, res) => {
        db.Product.find((err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    getUserOder: (req, res) => {
        db.User.aggregate([
            {
                $match: {
                    _id: new ObjectId(`${req.params.id}`)
                }
            },
            {
                $lookup: {
                    from: 'orders',         //the name of the collection you want to look up information on
                    localField: '_id',      // the field on the main collection (user in this case)
                    foreignField: 'userId', // the foreing fied that match on the other collection in this case order
                    as: 'userOrders'
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'userOrders.productId',
                    foreignField: '_id',
                    as: 'userProducts'
                }
            }

        ], (err, data) => {
            if (err)
                res.status(500).send(err)
            else
                res.json(data);
        })
    },
    getAllOrders: (req, res) => {
        db.Order.find((err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    }
};


module.exports = dbController;