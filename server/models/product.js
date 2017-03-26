const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String },
  description: { type: String },
  assortment: { type: String },
  addedBy: { type: String },
  price: { type: String },
  priceSale: { type: String },
  shipping: { type: String },
  dateAdded: { type: String },
  statOne: { type: String },
  statTwo: { type: String },
  statThree: { type: String },
  statFour: { type: String },
  statFive: { type: String },
  statSix: { type: String },
  imageMain: { type: String },
  imageTwo: { type: String },
  imageThree: { type: String },
  imageFour: { type: String },
  imageFive: { type: String },
  imageSix: { type: String },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'user'
  // },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'review'
  }]
});

ProductSchema.statics.addReview = function(id, content, rating) {
  const Review = mongoose.model('review');

  return this.findById(id)
    .then(product => {
      const review = new Review({ content, rating, product })
      product.reviews.push(review)
      return Promise.all([review.save(), product.save()])
        .then(([review, product]) => product);
    });
}

ProductSchema.statics.findReviews = function(id) {
  return this.findById(id)
    .populate('reviews')
    .then(product => product.reviews);
}

mongoose.model('product', ProductSchema);
