const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const Order = mongoose.model('order');
const OrderItemType = require('./order_item_type');

const OrderType = new GraphQLObjectType({
    name: 'OrderType',
    fields: () => ({
        id: { type: GraphQLID },
        shippingName: { type: GraphQLString },
        shippingAddress: { type: GraphQLString },
        shippingPhone: { type: GraphQLString },
        shippingEmail: { type: GraphQLString },
        billingName: { type: GraphQLString},
        billingAddress: { type: GraphQLString},
        billingPhone: { type: GraphQLString },
        billingEmail: { type: GraphQLString },
        cardNumber: { type: GraphQLString },
        cardExpiration: { type: GraphQLString},
        cardCvv: { type: GraphQLString },
        dateAndTime: { type: GraphQLString },
        shippedOn: { type: GraphQLString },
        user: {
            type: require('./user_type'),
            resolve(parentValue) {
                return Order.findById(parentValue).populate('user')
                .then(order => {
                    return order.user
                });
            }
        },
        orderItems: {
            type: new GraphQLList(OrderItemType),
            resolve(parentValue) {
                return Order.findOrderItems(parentValue.id);
            }
        }
    })
});

module.exports = OrderType;