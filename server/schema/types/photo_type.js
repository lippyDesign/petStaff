const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Photo = mongoose.model('photo');

const PhotoType = new GraphQLObjectType({
    name: 'PhotoType',
    fields: () => ({
        id: { type: GraphQLID },
        url: { type: GraphQLString },
        product: {
            type: require('./product_type'),
            resolve(parentValue) {
                return Photo.findById(parentValue).populate('product')
                .then(photo => {
                    console.log(photo)
                    return photo.product
                });
            }
        }
    })
});

module.exports = PhotoType;