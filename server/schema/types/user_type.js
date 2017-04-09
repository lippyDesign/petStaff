const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const mongoose = require('mongoose');

const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        shippingFirst: { type: GraphQLString },
        shippingLast: { type: GraphQLString },
        shippingEmail: { type: GraphQLString },
        shippingPhone: { type: GraphQLString },
        shippingStreet: { type: GraphQLString },
        shippingCity: { type: GraphQLString },
        shippingState: { type: GraphQLString },
        shippingZip: { type: GraphQLString },
        billingFirst: { type: GraphQLString },
        billingLast: { type: GraphQLString },
        billingEmail: { type: GraphQLString },
        billingPhone: { type: GraphQLString },
        billingStreet: { type: GraphQLString },
        billingCity: { type: GraphQLString },
        billingState: { type: GraphQLString },
        billingZip: { type: GraphQLString },
        cardNumber: { type: GraphQLString },
        cvv: { type: GraphQLString },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parentValue) {
                return User.findOrders(parentValue.id);
            }
        }
    })
});

module.exports = UserType;

const OrderType = require('./order_type');
