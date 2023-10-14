const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  borrowedBooks: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Reference to the Book model
      },
      dueDate: Date,
    },
  ],
});

module.exports = mongoose.model('Users', userSchema, 'Users');