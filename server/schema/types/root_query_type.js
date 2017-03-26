const mongoose = require('mongoose');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;
const UserType = require('./user_type');
const ProductType = require('./product_type');
const Product = mongoose.model('product');
const ReviewType = require('./review_type');
const Review = mongoose.model('review');

const RootQueryType = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			resolve(parentValue, args, req) {
				return req.user;
			}
		},
		products: {
			type: new GraphQLList(ProductType),
			resolve() {
				return Product.find({});
			}
		},
		product: {
			type: ProductType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return Product.findById(id);
			}
		},
		review: {
			type: ReviewType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parnetValue, { id }) {
				return Review.findById(id);
			}
		}
	}
});

module.exports = RootQueryType;
