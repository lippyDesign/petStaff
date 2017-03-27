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

const ColorType = new GraphQLObjectType({
    name: 'ColorType',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLString },
        // products: {
        //     type: new GraphQLList(ColorType),
        //     resolve(parentValue) {
        //         return Color.findProducts(parentValue.id);
        //     }
        // },
        product: {
            type: require('./product_type'),
            resolve(parentValue) {
                return Color.findById(parentValue).populate('product')
                .then(color => {
                    return color.product
                });
            }
        }
    })
});

module.exports = ColorType;