const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;

const UserType = require('./types/user_type');
const AuthService = require('../services/auth');
const Product = mongoose.model('product');
const ProductType = require('./types/product_type');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                assortment: { type: GraphQLString },
                price: { type: GraphQLString },
                priceSale: { type: GraphQLString },
                shipping: { type: GraphQLString },
                dateAdded: { type: GraphQLString },
                statOne: { type: GraphQLString },
                statTwo: { type: GraphQLString },
                statThree: { type: GraphQLString },
                statFour: { type: GraphQLString },
                statFive: { type: GraphQLString },
                statSix: { type: GraphQLString },
                imageMain: { type: GraphQLString },
                imageTwo: { type: GraphQLString },
                imageThree: { type: GraphQLString },
                imageFour: { type: GraphQLString },
                imageFive: { type: GraphQLString },
                imageSix: { type: GraphQLString },
                
            },
            resolve(parentValue, { title, description, assortment, price, priceSale, shipping, rating, dateAdded, statOne, statTwo, statThree, statFour, statFive, statSix, imageMain, imageTwo, imageThree, imageFour, imageFive, imageSix }) {
                return (new Product({ title, description, assortment, price, priceSale, shipping, rating, dateAdded, statOne, statTwo, statThree, statFour, statFive, statSix, imageMain, imageTwo, imageThree, imageFour, imageFive, imageSix })).save();
            }
        },
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                return AuthService.signup({ email, password, req });
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req) {
                const { user } = req;
                req.logout();
                return user;
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                return AuthService.login({ email, password, req });
            }
        }
    }
});

module.exports = mutation;
