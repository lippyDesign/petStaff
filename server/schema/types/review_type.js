const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const Review = mongoose.model('review');

const ReviewType = new GraphQLObjectType({
	name:  'ReviewType',
	fields: () => ({
		id: { type: GraphQLID },
		content: { type: GraphQLString },
		rating: { type: GraphQLInt },
		user: {
			type: require('./user_type'),
			resolve(parentValue) {
				return Review.findById(parentValue).populate('user')
					.then(review => {
						return review.user;
					});
			}
		},
		product: {
			type: require('./product_type'),
			resolve(parentValue) {
				return Review.findById(parentValue).populate('product')
					.then(review => {
						return review.product;
					});
			}
		}
	})
});

module.exports = ReviewType;
