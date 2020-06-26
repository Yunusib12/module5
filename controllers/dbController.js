const db = require('../models');

const dbController = {

    addUser: (req, res) => {

        db.User.create(req.body, (err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    getUSer: (req, res) => {
        db.User.find((err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })

    },
    getproduct: (req, res) => {
        db.Product.find((err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    }
};


module.exports = dbController;