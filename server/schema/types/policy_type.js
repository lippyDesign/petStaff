const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql;

const PolicyType = new GraphQLObjectType({
    name: 'PolicyType',
    fields: () => ({
        id: { type: GraphQLID },
        heading: { type: GraphQLString },
        content: { type: GraphQLString }
    })
});

module.exports = PolicyType;