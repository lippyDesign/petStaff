const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;
const mongoose = require('mongoose');
const ReviewType = require('./review_type');
const Product = mongoose.model('product');
const PhotoType = require('./photo_type');
const ColorType = require('./color_type');

const ProductType = new GraphQLObjectType({
    name: 'ProductType',
    fields: () => ({
        id: { type: GraphQLID },
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
        photos: {
            type: new GraphQLList(PhotoType),
            resolve(parentValue) {
                return Product.findPhotos(parentValue.id);
            }
        },
        colors: {
            type: new GraphQLList(ColorType),
            resolve(parentValue) {
                return Product.findColors(parentValue.id);
            }
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve(parentValue) {
                return Product.findReviews(parentValue.id);
            }
        }
    })
});

module.exports = ProductType;