const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product'
  },
  url: { type: String }
});

mongoose.model('photo', PhotoSchema);
