const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
  heading: { type: String },
  content: { type: String }
});

AboutSchema.statics.edit = function(heading, content) {
  const About = mongoose.model('about');
  return this.find({})
    .then(aboutSection => {
      // if section does not exist yet
      if (!aboutSection) {
        aboutSection = new About({ heading, content });
        return Promise.all([aboutSection.save()])
          .then(([aboutSection]) => aboutSection);
      } else {
        // if section already exists
        aboutSection.update({ heading, content })
          .then(() => {
            return this.find({}).then(section => section);
          })
      }
    });
}

mongoose.model('about', AboutSchema);