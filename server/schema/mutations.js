const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = graphql;

const User = mongoose.model('user');
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');
const Product = mongoose.model('product');
const ProductType = require('./types/product_type');
const Color = mongoose.model('color');
const ColorType = require('./types/color_type');
const Size = mongoose.model('size');
const SizeType = require('./types/size_type');
const OrderType = require('./types/order_type');
const Order = mongoose.model('order');
const OrderItemType = require('./types/order_item_type');
const OrderItem = mongoose.model('orderItem');
const AboutType = require('./types/about_type');
const About = mongoose.model('about');
const PolicyType = require('./types/policy_type');
const Policy = mongoose.model('policy');
const ShippingAndReturnsType = require('./types/shipping_and_returns_type');
const ShippingAndReturns = mongoose.model('shippingAndReturns');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                assortment: { type: GraphQLString },
                price: { type: GraphQLString },
                priceSale: { type: GraphQLString },
                shipping: { type: GraphQLString },
                dateAdded: { type: GraphQLString },
                statOne: { type: GraphQLString },
                statTwo: { type: GraphQLString },
                statThree: { type: GraphQLString },
                statFour: { type: GraphQLString },
                statFive: { type: GraphQLString },
                statSix: { type: GraphQLString },
                imageMain: { type: GraphQLString },
                imageTwo: { type: GraphQLString },
                imageThree: { type: GraphQLString },
                imageFour: { type: GraphQLString },
                imageFive: { type: GraphQLString },
                imageSix: { type: GraphQLString },
            },
            resolve(parentValue, { title, description, assortment, price, priceSale, shipping, rating, dateAdded, statOne, statTwo, statThree, statFour, statFive, statSix, imageMain, imageTwo, imageThree, imageFour, imageFive, imageSix }) {
                return (new Product({ title, description, assortment, price, priceSale, shipping, rating, dateAdded, statOne, statTwo, statThree, statFour, statFive, statSix, imageMain, imageTwo, imageThree, imageFour, imageFive, imageSix })).save();
            }
        },
        addPhotoToProduct: {
            type: ProductType,
            args: {
                photo: { type: GraphQLString },
                productId: { type: GraphQLID }
            },
            resolve(parentValue, { photo, productId }) {
                return Product.addPhoto(productId, photo);
            }
        },
        addReviewToProduct: {
            type: ProductType,
            args: {
                content: { type: GraphQLString },
                rating: { type: GraphQLInt },
                productId: { type: GraphQLID },
                userId: { type: GraphQLID }
            },
            resolve(parentValue, { content, rating, productId }, req) {
                const userId = req.user.id;
                return Product.addReview(productId, content, rating, userId);
            }
        },
        addColorToProduct: {
            type: ProductType,
            args: {
                productId: { type: GraphQLID },
                color: { type: GraphQLString }
            },
            resolve(parentValue, { productId, color }) {
                return Product.addColor(productId, color);
            }
        },
        addSizeToProduct: {
            type: ProductType,
            args: {
                productId: { type: GraphQLID },
                size: { type: GraphQLString }
            },
            resolve(parentValue, { productId, size }) {
                return Product.addSize(productId, size);
            }
        },
        editProduct: {
            type: ProductType,
            args: {
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                assortment: { type: GraphQLString },
                price: { type: GraphQLString },
                priceSale: { type: GraphQLString },
                shipping: { type: GraphQLString },
                dateModified: { type: GraphQLString },
                statOne: { type: GraphQLString },
                statTwo: { type: GraphQLString },
                statThree: { type: GraphQLString },
                statFour: { type: GraphQLString },
                statFive: { type: GraphQLString },
                statSix: { type: GraphQLString },
                imageMain: { type: GraphQLString },
                imageTwo: { type: GraphQLString },
                imageThree: { type: GraphQLString },
                imageFour: { type: GraphQLString },
                imageFive: { type: GraphQLString },
                imageSix: { type: GraphQLString },
            },
            resolve(parentValue, { title, description, assortment, price, priceSale, shipping, dateModified, statOne, statTwo, statThree, statFour, statFive, statSix, imageMain, imageTwo, imageThree, imageFour, imageFive, imageSix, id }) {
                return Product.editProduct(id, title, description, assortment, price, priceSale, shipping, dateModified, statOne, statTwo, statThree, statFour, statFive, statSix, imageMain, imageTwo, imageThree, imageFour, imageFive, imageSix);
            }
        },
        deleteProduct: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, { id }) {
                return Product.deleteProduct(id);
            }
        },
        updateSearchText: {
            type: new GraphQLList(ProductType),
            args: {
                searchText: { type: GraphQLString }
            },
            resolve(parentValue, { searchText }) {
                return Product.find({ title: { "$regex": searchText, "$options": "i" } })
                    .then(products => products)
            }
        },
        addOrder: {
            type: OrderType,
            args: {
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
                shippedOn: { type: GraphQLString }
            },
            resolve(parentValue, { shippingName, shippingAddress, shippingPhone, shippingEmail, billingName, billingAddress, billingPhone, billingEmail, cardNumber, cardExpiration, cardCvv, dateAndTime, shippedOn }, req) {
                const user = req.user ? req.user.id : null;
                return Order.addOrder( shippingName, shippingAddress, shippingPhone, shippingEmail, billingName, billingAddress, billingPhone, billingEmail, cardNumber, cardExpiration, cardCvv, dateAndTime, shippedOn, user);
            }
        },
        addItemToOrder: {
            type: OrderType,
            args: {
                orderId: { type: GraphQLID },
                color: { type: GraphQLString },
                size: { type: GraphQLString },
                title: { type: GraphQLString },
                price: { type: GraphQLString },
                priceSale: { type: GraphQLString },
                shipping: { type: GraphQLString },
                quantity: { type: GraphQLInt },
                productId: { type: GraphQLID },
            },
            resolve(parentValue, { orderId, color, size, title, price, priceSale, shipping, quantity, productId }) {
                return Order.addItem(orderId, color, size, title, price, priceSale, shipping, quantity, productId);
            }
        },
        updateOrderShipped: {
            type: OrderType,
            args: {
                id: { type: GraphQLID },
                shippedOn: { type: GraphQLString }
            },
            resolve(parentValue, { id, shippedOn }) {
                return Order.findById(id)
                    .then(order => order.update({ shippedOn }))
            }
        },
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
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
                cardExpiration: { type: GraphQLString },
                cvv: { type: GraphQLString }
            },
            resolve(parentValue, { email, password, shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip,
                 billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip, cardNumber, cardExpiration, cvv }, req) {
                return AuthService.signup({ email, password, shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip,
                 billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip, cardNumber, cardExpiration, cvv, req });
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req) {
                const { user } = req;
                req.logout();
                return user;
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                return AuthService.login({ email, password, req });
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
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
                cardExpiration: { type: GraphQLString },
                cvv: { type: GraphQLString }
            },
            resolve(parentValue, { shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip, billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip, cardNumber, cardExpiration, cvv }, req) {
                return User.updateUser(req, shippingFirst, shippingLast, shippingEmail, shippingPhone, shippingStreet, shippingCity, shippingState, shippingZip, billingFirst, billingLast, billingEmail, billingPhone, billingStreet, billingCity, billingState, billingZip, cardNumber, cardExpiration, cvv);
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, { id }) {
                return User.remove({ _id: id });
            }
        },
        editAboutPage: {
            type: AboutType,
            args: {
                heading: { type: GraphQLString },
                content: { type: GraphQLString },
            },
            resolve(parentValue, { heading, content }) {
                return About.edit(heading, content);
            }
        },
        editPolicyPage: {
            type: PolicyType,
            args: {
                heading: { type: GraphQLString },
                content: { type: GraphQLString },
            },
            resolve(parentValue, { heading, content }) {
                return Policy.edit(heading, content);
            }
        },
        editShippingAndReturnsPage: {
            type: ShippingAndReturnsType,
            args: {
                heading: { type: GraphQLString },
                content: { type: GraphQLString },
            },
            resolve(parentValue, { heading, content }) {
                return ShippingAndReturns.edit(heading, content);
            }
        },
    }
});

module.exports = mutation;
