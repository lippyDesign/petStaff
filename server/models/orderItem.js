const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    color: { type: String },
    size: { type: String },
    title: { type: String },
    price: { type: String },
    priceSale: { type: String },
    shipping: { type: String },
    quantity: { type: Number },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
});

mongoose.model('orderItem', OrderItemSchema);