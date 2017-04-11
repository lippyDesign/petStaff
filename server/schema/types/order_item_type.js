const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const OrderItem = mongoose.model('orderItem');

const OrderItemType = new GraphQLObjectType({
    name: 'OrderItemType',
    fields: () => ({
        id: { type: GraphQLID },
        color: { type: GraphQLString },
        size: { type: GraphQLString },
        title: { type: GraphQLString },
        price: { type: GraphQLString },
        priceSale: { type: GraphQLString },
        shipping: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        product: {
            type: require('./product_type'),
            resolve(parentValue) {
                console.log(parentValue)
                return OrderItem.findById(parentValue).populate('product')
                .then(orderItem => {
                    return orderItem.product
                });
            }
        }
    })
});

module.exports = OrderItemType