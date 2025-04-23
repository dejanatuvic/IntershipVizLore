const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    genres: [String],
  
    physical: {
      available: Boolean,
      location: String,
      isbn: String
    },
  
    digital: {
      available: Boolean,
      format: String,
      url: String,
      filesizeMB: Number
    },
  
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = mongoose.model('Book', bookSchema);