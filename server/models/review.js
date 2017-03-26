const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'review'
  },
  content: { type: String },
  rating: { type: Number }
});

mongoose.model('review', ReviewSchema);
