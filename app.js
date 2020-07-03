require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const routes = require('./routes');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const mongoDB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT | 3000;
const app = express();


//Parsing the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes 
app.use(routes);

//Initiare GraphQL
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

// Connecting to the database and starting the se server
mongoose.connect(mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`)))
    .catch((error) => console.error(error));
