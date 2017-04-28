const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShippingAndReturnsSchema = new Schema({
  heading: { type: String },
  content: { type: String }
});

ShippingAndReturnsSchema.statics.edit = function(heading, content) {
  const ShippingAndReturns = mongoose.model('shippingAndReturns');
  return this.find({})
    .then(shippingSection => {
      // if section does not exist yet
      if (!shippingSection) {
        shippingSection = new ShippingAndReturns({ heading, content });
        return Promise.all([shippingSection.save()])
          .then(([shippingSection]) => shippingSection);
      } else {
        // if section already exists
        shippingSection.update({ heading, content })
          .then(() => {
            return this.find({}).then(section => section);
          })
      }
    });
}

mongoose.model('shippingAndReturns', ShippingAndReturnsSchema);