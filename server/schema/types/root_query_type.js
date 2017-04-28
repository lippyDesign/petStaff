const mongoose = require('mongoose');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;
const UserType = require('./user_type');
const ProductType = require('./product_type');
const Product = mongoose.model('product');
const ReviewType = require('./review_type');
const Review = mongoose.model('review');
const OrderType = require('./order_type');
const Order = mongoose.model('order');
const AboutType = require('./about_type');
const About = mongoose.model('about');
const PolicyType = require('./policy_type');
const Policy = mongoose.model('policy');
const ShippingAndReturnsType = require('./shipping_and_returns_type');
const ShippingAndReturns = mongoose.model('shippingAndReturns');

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
		randomProducts: {
			// will return 3 random products
			type: new GraphQLList(ProductType),
			resolve() {
				const getRandoms = (num, arr) => {
					if (arr.length === 3) return arr;
					const random = Math.floor(Math.random() * num);
					if (arr.indexOf(random) !== -1) return getRandoms(num, arr);
					arr.push(random);
					return getRandoms(num, arr);
				}
				return Product.count()
					.then(c => {
						if (c <= 3) return Product.find({});
						const randoms = getRandoms(c, []);
						return randoms.map(random => {
							return Product.findOne().skip(random).then(r => {
								return r;
							});
						});
					});
			}
		},
		review: {
			type: ReviewType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parnetValue, { id }) {
				return Review.findById(id);
			}
		},
		orders: {
			type: new GraphQLList(OrderType),
			resolve() {
				return Order.find({});
			}
		},
		unshippedOrders: {
			type: new GraphQLList(OrderType),
			resolve() {
				return Order.find({ shippedOn: null, shippedOn: '' });
			}
		},
		order: {
			type: OrderType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parnetValue, { id }) {
				return Order.findById(id);
			}
		},
		about: {
			type: AboutType,
			resolve() {
				return About.find({});
			}
		},
		policy: {
			type: PolicyType,
			resolve() {
				return Policy.find({});
			}
		},
		shippingAndReturns: {
			type: ShippingAndReturnsType,
			resolve() {
				return ShippingAndReturns.find({});
			}
		}
	}
});

module.exports = RootQueryType;
