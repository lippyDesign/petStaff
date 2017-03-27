const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product'
  },
  value: { type: String },
//   products: [{
//     type: Schema.Types.ObjectId,
//     ref: 'product'
//   }]
});

// ColorSchema.statics.findProducts = function(id) {
//     return this.findById(id)
//         .populate('products')
//         .then(color => color.products);
// }

mongoose.model('color', ColorSchema);