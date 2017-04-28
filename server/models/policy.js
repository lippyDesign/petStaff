const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicySchema = new Schema({
  heading: { type: String },
  content: { type: String }
});

PolicySchema.statics.edit = function(heading, content) {
  const Policy = mongoose.model('policy');
  return this.findOne({})
    .then(policySection => {
      // if section does not exist yet
      if (!policySection) {
        policySection = new Policy({ heading, content });
        return Promise.all([policySection.save()])
          .then(([policySection]) => policySection);
      } else {
        // if section already exists
        policySection.update({ heading, content })
          .then(() => {
            return this.find({}).then(section => section);
          })
      }
    });
}

mongoose.model('policy', PolicySchema);