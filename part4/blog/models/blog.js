const mongoose = require('mongoose')

// schema for db post, add restraints later if needed
// makes sure db POST requests are all same in mongo
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// does not allow for missing likes field
function ifLikesMissing(object) {
  if ('likes' in object === false){
    return object.likes = 0
  } else {
    return object
  }
}

// gets rid of mongoose set features so that GET request is cleaner
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        ifLikesMissing(returnedObject)
    }
})

module.exports = mongoose.model('Blog', blogSchema)