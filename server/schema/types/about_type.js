const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql;

const AboutType = new GraphQLObjectType({
    name: 'AboutType',
    fields: () => ({
        id: { type: GraphQLID },
        heading: { type: GraphQLString },
        content: { type: GraphQLString }
    })
});

module.exports = AboutType;