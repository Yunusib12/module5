const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');
const db = require('../models');
const User = require('../models/User');

// GraphQL Type
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema } = graphql;


//Product Object
const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: 'Information about the product that we have in the stock',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        productName: {
            type: GraphQLString
        },
        price: {
            type: GraphQLString
        },
        dateCreated: {
            type: GraphQLString
        }
    })
});

//Order Object
const OrderType = new GraphQLObjectType({
    name: 'Order',
    description: "List of order place by the user",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return db.User.findById(parent.userId);
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return db.Product.findById(parent.productId);
            }
        },
        amount: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        dateOrder: {
            type: GraphQLString
        }
    })
})


// User Object
const UserType = new GraphQLObjectType({
    name: "User",
    description: "User information",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        userCreated: {
            type: GraphQLString
        }
        // ,
        // order: {
        //     type: new GraphQLList(OrderType),
        //     resolve(parent, args) {
        //         return db.Order.find({ userId: parent.id });
        //     }
        // }

    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                _id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //return db.User.findById({});
                return axios.get(`http://localhost:3000/api/user/${args._id}`)
                    .then((res) => res.data);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                //return db.User.findById({});
                return axios.get(`http://localhost:3000/api/users`)
                    .then((res) => res.data);
            }
        },
        userOder: {
            type: new GraphQLList(OrderType),
            args: {
                _id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/api/order/${args._id}`)
                    .then((resp) => resp.data);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});