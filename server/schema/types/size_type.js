const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Size = mongoose.model('size');

const ProductType = require('./product_type');

const SizeType = new GraphQLObjectType({
    name: 'SizeType',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parentValue) {
                return Size.findById(parentValue).populate('product')
                    .then(size => {
                        return size.products
                    });
            }
        }
    })
});

module.exports = SizeType;