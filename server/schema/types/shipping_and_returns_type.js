const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql;

const ShippingAndReturnsType = new GraphQLObjectType({
    name: 'ShippingAndReturnsType',
    fields: () => ({
        id: { type: GraphQLID },
        heading: { type: GraphQLString },
        content: { type: GraphQLString }
    })
});

module.exports = ShippingAndReturnsType;