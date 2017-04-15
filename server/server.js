const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

// Create a new Express application
const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://petstaff:123456@ds045644.mlab.com:45644/petstaff';

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

//////////////////////////////// EMAIL ///////////////////////////////////

var nodemailer = require('nodemailer');
 
// create reusable transporter object using SMTP transport 
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vololipu@gmail.com',
        pass: 'Number1fan!'
    }
});

function sendEmailPlease(res) {
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            res.send('sent')
        }
    });
}

var bodyParser = require('body-parser')
// parse application/json
app.use(bodyParser.json())

// if someone contacts us
app.post('/contactus', function (req, res) {
    const { email, message } = req.body;
    const date = new Date().toString();
    mailOptions = {
        from: `<${email}>`,
        to: 'vololipu@gmail.com',
        subject: 'message about PET CLOTHES',
        text: 'Hello world',
        html: `
            <p><b>From:</b> ${email}</p>
            <p><b>Message:</b> ${message}</p>
            <p><b>Date:</b> ${date}</p>`
    }
    sendEmailPlease(res);
});

// purchase confirmation email
app.post('/contfirmationemail', function (req, res) {
    const { orderId, shippingName, shippingAddress, shippingPhone, shippingEmail, billingName, billingAddress, billingPhone, billingEmail, cardNumber, dateAndTime, cart } = req.body;
    let c = '';
    let itemsCost = 0;
    let shippingCost = 0
    cart.forEach(item => {
        const cost = item.priceSale || item.price;
        const shipp = item.shipping || '0';
        itemsCost = itemsCost + (Number(cost) * item.quantity);
        shippingCost = shippingCost + (Number(shipp) * item.quantity);
        return c = c + `
            <p><b>${item.quantity}</b> x <b>${item.title}</b></p>
            <p>regular price: $${item.price}</p>
            <p>sale price: ${item.priceSale ? `$${item.priceSale}` : 'not on sale'}</p>
            <p>shipping cost: ${item.shipping ? `$${item.shipping}` : 'free shipping'}</p>
            <p>size: ${item.size === 'oneSizeFitsAll' ? 'One Size Fits All' : item.size.toUpperCase()}</p>
            <p>color: ${item.color}</p>
        `;
    })
    mailOptions = {
        from: `The Pet Team <vololipu@gmail.com>`,
        to: shippingEmail,
        subject: 'Thank You for your Pet Hru order',
        text: 'Thank You for your Pet Hru order',
        html: `
            <h3>Thank You For Your Order:</h3>
            <p><b>Order ID: </b>${orderId}</p>
            <h3>Shipping Info:</h3>
            <p>${shippingName}</p>
            <p>${shippingEmail}</p>
            <p>${shippingPhone}</p>
            <p>${shippingAddress}</p>
            <h3>Payment Info:</h3>
            <p><b>Card #:</b> **** **** **** ${cardNumber}</p>
            <h3>Billing Info:</h3>
            <p>${billingName}</p>
            <p>${billingEmail}</p>
            <p>${billingPhone}</p>
            <p>${billingAddress}</p>
            <h3>Items:</h3>
            ${c}
            <h3>Other Info:</h3>
            <p><b>Date and Time:</b> ${dateAndTime}</p>
            <p><b>Cost of items:</b> $${itemsCost.toFixed(2)}</p>
            <p><b>Cost of shipping:</b> $${shippingCost.toFixed(2)}</p>
            <p><b>Total:</b> $${(itemsCost + shippingCost).toFixed(2)}</p>
            <h3>If you have any quetions:</h3>
            <p>Please contact us for <a href="https://www.google.com">more information</a></p>`

    }
    sendEmailPlease(res);
});

//////////////////////////////// END EMAIL ///////////////////////////////////
//////////////////////////////// START STRIPE PAYMENT ///////////////////////////////////
const stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

app.post('/charge', function(req, res) {
    stripe.charges.create({
        amount: 2000,
        currency: "usd",
        source: "tok_189gAD2eZvKYlo2CQjyFRmV1", // obtained with Stripe.js
        description: "Charge for matthew.martinez@example.com"
    }, function(err, charge) {
        // asynchronously called
        if (err) {
            console.log('ERRORR :(')
            console.log(err)
        }
    });
    console.log('payment successful')
});
//////////////////////////////// END STRIPE PAYMENT ///////////////////////////////////

module.exports = app;
