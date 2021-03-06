const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Color = mongoose.model('color');

const ProductType = require('./product_type');

const ColorType = new GraphQLObjectType({
    name: 'ColorType',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parentValue) {
                return Color.findById(parentValue).populate('product')
                    .then(color => {
                        return color.products
                    });
            }
        }
    })
});

module.exports = ColorType;