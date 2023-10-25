const express = require('express')
const router = express.Router();
const usersAuth = require("../auth/usersAuth");
const userMiddleware = require("../middlewares/users/user-mw");
const userController = require("../controllers/Users/userController");

// Start Users Routes

// Create new User Route
router.post("/users/create_new_user", usersAuth.registerUser)

// Login User
router.post("/users/login", usersAuth.loginUser)

// Get All books
router.get("/users/get_all_books", userMiddleware.usersMiddleware, userController.getAllBooks)

// Get All Available Books
router.get("/users/get_all_available_books", userMiddleware.usersMiddleware, userController.getAllAvailableBooks)

// Get Gategory Books
router.get("/users/get_category_books/:category", userMiddleware.usersMiddleware, userController.getCategoryBooks)

// Get Available Gategory Books
router.get("/users/get_available_category_books/:category", userMiddleware.usersMiddleware, userController.getCategoryAvailableBooks)

// Borrow Book
router.get("/users/borrow_book/:bookId/:duration", userMiddleware.usersMiddleware, userController.borrowBook)

// List Borrowed Books
router.get("/users/list_borrowed_books", userMiddleware.usersMiddleware, userController.listBorrowedBooks);

// End Users Routes

module.exports = router;

