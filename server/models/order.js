const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  shippingName: { type: String },
  shippingAddress: { type: String },
  shippingPhone: { type: String },
  shippingEmail: { type: String },
  billingName: { type: String},
  billingAddress: { type: String},
  billingPhone: { type: String },
  billingEmail: { type: String },
  cardNumber: { type: String },
  cardExpiration: { type: String},
  cardCvv: { type: String },
  dateAndTime: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  orderItems: [{
    type: Schema.Types.ObjectId,
    ref: 'orderItem'
  }]
});
OrderSchema.statics.addOrder = function(shippingName, shippingAddress, shippingPhone, shippingEmail, billingName, billingAddress, billingPhone, billingEmail, cardNumber, cardExpiration, cardCvv, dateAndTime, user) {
  const Order = mongoose.model('order');
  return new Order({ shippingName, shippingAddress, shippingPhone, shippingEmail, billingName, billingAddress, billingPhone, billingEmail, cardNumber, cardExpiration, cardCvv, dateAndTime, user }).save()
    .then(order => {
      if (user) {
        const User = mongoose.model('user');
        User.findById(user).then(u => {
          u.orders.push(order)
          return Promise.all([u.save(), order.save()])
            .then(([u, order]) => order);
        })
      }
      return order;
    })
}

OrderSchema.statics.addItem = function(orderId, color, size,title, price, priceSale, shipping, quantity, productId) {
  const OrderItem = mongoose.model('orderItem');
  return this.findById(orderId)
    .then(order => {
      const orderItem = new OrderItem({ color, size,title, price, priceSale, shipping, quantity, productId })
      order.orderItems.push(orderItem)
      return Promise.all([orderItem.save(), order.save()])
        .then(([orderItem, order]) => order);
    });
}

mongoose.model('order', OrderSchema);