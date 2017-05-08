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

ProductSchema.statics.addReview = function(id, content, rating, user) {
  const Review = mongoose.model('review');

  return this.findById(id)
    .then(product => {
      const review = new Review({ content, rating, product, user })
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
		// find the color by value
      Color.findOne({ value })
        .then(color => {
          if (!color) {
            color = new Color({ value });
          }
          product.colors.push(color);
          color.products.push(product);
          return Promise.all([color.save(), product.save()])
            .then(([color, product]) => product);
        })
		//.catch(res => console.log(res))
    });
}
ProductSchema.statics.addSize = function(id, value) {
  const Size = mongoose.model('size');
  return this.findById(id)
    .then(product => {
		// find the size by value
      Size.findOne({ value })
        .then(size => {
          if (!size) {
            size = new Size({ value });
          }
          product.sizes.push(size);
          size.products.push(product);
          return Promise.all([size.save(), product.save()])
            .then(([size, product]) => product);
        })
        //.catch(res => console.log(res));
    });
}
ProductSchema.statics.editProduct = function(id, title, description, assortment, price, priceSale, shipping, dateModified, statOne, statTwo, statThree, statFour, statFive, statSix, imageMain, imageTwo, imageThree, imageFour, imageFive, imageSix) {
  const imgs = [];
  [imageMain, imageTwo, imageThree, imageFour, imageFive, imageSix].forEach(im => {
    if (im) imgs.push(im)
  });
  const Product = mongoose.model('product');
  const Photo = mongoose.model('photo');

  async function updateProd() {
    const product = await Product.findById(id);
    // we'll erase all colors and all sizes associated with the product.
    // remove product's sizes
    if (product.sizes.length > 0) {
      const Size = mongoose.model('size');
      product.sizes.forEach(sizeId => {
        Size.findById(sizeId)
        .then(size => {
          size.products.pull(id)
          return Promise.all([size.save()])
        })
        .catch(res => {
          console.log('ERROR:')
          console.log('ERROR:')
          console.log('ERROR:')
          console.log(res)
        })
      })
    }
    // remove product's colors
    if (product.colors.length > 0) {
      const Color = mongoose.model('color');
      product.colors.forEach(colorId => {
        Color.findById(colorId)
        .then(color => {
          color.products.pull(id)
          return Promise.all([color.save()])
        })
        .catch(res => {
          console.log('ERROR:')
          console.log('ERROR:')
          console.log('ERROR:')
          console.log(res)
        })
      })
    }
    return product.update({
      title, description, assortment, price, priceSale, shipping, dateModified, statOne, statTwo, statThree, statFour, statFive, statSix, sizes: [], colors: []
    })
  }
  async function removeNotNeededPhotos() {
    const picList = [];
    let oldPics;
    // remove refs from Product.photos
    return imgs.forEach(photo => {
      (async function() {
        const pic = await Photo.findOne({ url: photo });
        picList.push(pic.id);   
        if (picList.length === imgs.length) {
          const product = await Product.findById(id);
          oldPics = product.photos;
          return product.update({ photos: picList }).then(() => {
            // remove refs from Photos
            oldPics.forEach(p => {
              Photo.findById(p).then(pho => {
                if (picList.indexOf(pho.id) === -1) {
                  pho.remove();
                }
              })
            })
          })
        }
      })()
    })
  }
  updateProd()
  removeNotNeededPhotos();
  return Product.findById(id).then(p => p);
}
ProductSchema.statics.deleteProduct = function(id) {
	return this.findById(id)
		.then(product => {
			// remove product's photos
			if (product.photos.length > 0) {
				const Photo = mongoose.model('photo');
				product.photos.forEach(picId => {
					Photo.findById(picId).then(pic => pic.remove())
				})
			}
			// remove product's reviews
      		if (product.reviews.length > 0) {
				const Review = mongoose.model('review');
				product.reviews.forEach(reviewId => {
					Review.findById(reviewId).then(rev => rev.remove())
				})
			}
			// remove product's sizes
			if (product.sizes.length > 0) {
				const Size = mongoose.model('size');
				product.sizes.forEach(sizeId => {
          console.log('sizeId')
          console.log(sizeId)
					Size.findById(sizeId)
          .then(size => {
            console.log('size')
            console.log(size)
						size.products.pull(id)
						return Promise.all([size.save()])
					})
          .catch(res => {
            console.log('ERROR:')
            console.log('ERROR:')
            console.log('ERROR:')
            console.log(res)
          })
				})
			}
			// remove product's colors
			if (product.colors.length > 0) {
				const Color = mongoose.model('color');
				product.colors.forEach(colorId => {
          console.log('colorId')
          console.log(colorId)
					Color.findById(colorId)
          .then(color => {
            console.log('color')
            console.log(color)
						color.products.pull(id)
						return Promise.all([color.save()])
					})
          .catch(res => {
            console.log('ERROR:')
            console.log('ERROR:')
            console.log('ERROR:')
            console.log(res)
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
