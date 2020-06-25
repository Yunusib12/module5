require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const mongoose = require('mongoose');
const mongoDB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT | 3000;


//Parsing the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes 
app.use(routes);


// Connecting to the database and starting the se server
mongoose.connect(mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`)))
    .catch((error) => console.error(error));
