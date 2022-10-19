const mangoose = require('mongoose');

const postSchema = mangoose.Schema({
  title: { type: String, required: true },
  context: { type: String, required: true }
});

module.exports = mangoose.model('Post', postSchema);
