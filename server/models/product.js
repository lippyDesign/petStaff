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
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'user'
  // },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'photo'
  }],
  colors: [{
    type: Schema.Types.ObjectId,
    ref: 'color'
  }],
  sizes: [{
    type: Schema.Types.ObjectId,
    ref: 'size'
  }],
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
ProductSchema.statics.addPhoto = function(id, url) {
  const Photo = mongoose.model('photo');

  return this.findById(id)
    .then(product => {
      const photo = new Photo({ url, product })
      product.photos.push(photo)
      return Promise.all([photo.save(), product.save()])
        .then(([photo, product]) => product);
    });
}
ProductSchema.statics.addColor = function(id, value) {
  const Color = mongoose.model('color');
  return this.findById(id)
    .then(product => {
      Color.findOne({ value })
        .then(color => {
            product.colors.push(color);
            color.products.push(product);
            return Promise.all([color.save(), product.save()])
              .then(([color, product]) => product);
        })
    });
}
ProductSchema.statics.addSize = function(id, value) {
  const Size = mongoose.model('size');
  return this.findById(id)
    .then(product => {
      Size.findOne({ value })
        .then(size => {
            product.sizes.push(size);
            size.products.push(product);
            return Promise.all([size.save(), product.save()])
              .then(([size, product]) => product);
        })
    });
}
ProductSchema.statics.deleteProduct = function(id) {
	return this.findById(id)
		.then(product => {
			if (product.photos.length > 0) {
				const Photo = mongoose.model('photo');
				product.photos.forEach(picId => {
					Photo.findById(picId).then(pic => pic.remove())
				})
			}
			if (product.sizes.length > 0) {
				const Size = mongoose.model('size');
				product.sizes.forEach(sizeId => {
					Size.findById(sizeId).then(size => {
						size.products.pull(id)
						return Promise.all([size.save()])
					})
				})
			}
			if (product.colors.length > 0) {
				const Color = mongoose.model('color');
				product.colors.forEach(colorId => {
					Color.findById(colorId).then(color => {
						color.products.pull(id)
						return Promise.all([color.save()])
					})
				})
			}
			product.remove();
		})
}
ProductSchema.statics.findPhotos = function(id) {
  return this.findById(id)
    .populate('photos')
    .then(product => product.photos);
}
ProductSchema.statics.findColors = function(id) {
  return this.findById(id)
    .populate('colors')
    .then(product => product.colors);
}
ProductSchema.statics.findSizes = function(id) {
  return this.findById(id)
    .populate('sizes')
    .then(product => product.sizes);
}
ProductSchema.statics.findReviews = function(id) {
  return this.findById(id)
    .populate('reviews')
    .then(product => product.reviews);
}

mongoose.model('product', ProductSchema);
