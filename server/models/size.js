const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SizeSchema = new Schema({
  value: { type: String },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'product'
  }]
});

SizeSchema.statics.findProducts = function(value) {
    return this.findOne({ value })
        .populate('products')
        .then(color => color.products);
}

mongoose.model('size', SizeSchema);