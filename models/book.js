const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'borrowed'],
    default: 'available',
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema
  },
  dueDate: {
    type: Date,
    default: null,
  },
});


module.exports = mongoose.model('Book', bookSchema);