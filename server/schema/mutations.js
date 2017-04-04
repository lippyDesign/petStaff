const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID
} = graphql;

const UserType = require('./types/user_type');
const AuthService = require('../services/auth');
const Product = mongoose.model('product');
const ProductType = require('./types/product_type');
const Color = mongoose.model('color');
const ColorType = require('./types/color_type');
const Size = mongoose.model('size');
const SizeType = require('./types/size_type');

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
        addPhotoToProduct: {
            type: ProductType,
            args: {
                photo: { type: GraphQLString },
                productId: { type: GraphQLID }
            },
            resolve(parentValue, { photo, productId }) {
                return Product.addPhoto(productId, photo);
            }
        },
        addReviewToProduct: {
            type: ProductType,
            args: {
                content: { type: GraphQLString },
                rating: { type: GraphQLInt },
                productId: { type: GraphQLID },
                userId: { type: GraphQLID }
            },
            resolve(parentValue, { content, rating, productId }, req) {
                const userId = req.user.id;
                return Product.addReview(productId, content, rating, userId);
            }
        },
        addColorToProduct: {
            type: ProductType,
            args: {
                productId: { type: GraphQLID },
                color: { type: GraphQLString }
            },
            resolve(parentValue, { productId, color }) {
                return Product.addColor(productId, color);
            }
        },
        addSizeToProduct: {
            type: ProductType,
            args: {
                productId: { type: GraphQLID },
                size: { type: GraphQLString }
            },
            resolve(parentValue, { productId, size }) {
                return Product.addSize(productId, size);
            }
        },
        addColor: {
            type: ColorType,
            args: { value: { type: GraphQLString } },
            resolve(parentValue, { value }) {
                return (new Color({ value })).save();
            }
        },
        addSize: {
            type: SizeType,
            args: { value: { type: GraphQLString } },
            resolve(parentValue, { value }) {
                return (new Size({ value })).save();
            }
        },
        deleteProduct: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, { id }) {
                return Product.deleteProduct(id);
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
