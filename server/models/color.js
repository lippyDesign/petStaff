const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
  value: { type: String },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'product'
  }]
});

ColorSchema.statics.findProducts = function(value) {
    return this.findOne({ value })
        .populate('products')
        .then(color => color.products);
}

mongoose.model('color', ColorSchema);