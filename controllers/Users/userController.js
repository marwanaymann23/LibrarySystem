require('dotenv').config();
const Book = require("../../models/book");
const User = require("../../models/user");
const jwt = require('jsonwebtoken');

const getAllBooks = async (req, res) => {
    try{

        const books = await Book.find();
        res.json(books);

    }catch(error){
        res.status(401).json({error: "Can't get All Books"})
    }
}

const getAllAvailableBooks = async (req, res) => {
    try{
        const availableBooks = await Book.find({ status: 'available' });
        res.json(availableBooks);
    }catch(error){
        res.status(401).json({error: "Can't get All available Books"})

    }
}

const getCategoryBooks = async (req, res) => {
    const { category } = req.params;

    try {
        const books = await Book.find({ category });
        res.json(books);
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Error' });
    }
}

const getCategoryAvailableBooks = async (req, res) => {
    const { category } = req.params;

    try {
        const availableBooks = await Book.find({ category, status: 'available' });
        res.json(availableBooks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const borrowBook = async(req, res) => {

    const authorizationHeader  = req.headers.authorization
    const { bookId, duration } = req.params;

    if (!authorizationHeader) {
        return res.status(401).json({error: 'Authentication required'});
    }
    const token = authorizationHeader.split(' ')[1];

    try{

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        const book = await Book.findById(bookId);

        if (!book) {
        return res.status(404).json({ error: 'Book not found' });
        }

        if (book.status !== 'available') {
        return res.status(400).json({ error: 'Book is not available for borrowing' });
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + duration);

        const user = await User.findOne({username: decoded.username});
        user.borrowedBooks.push(bookId);
        await user.save();

        book.status = 'borrowed';
        book.borrower = user._id;
        book.dueDate = dueDate;

        await book.save();

        res.status(200).json({message: 'Book borrowed successfully'})

    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
}

const listBorrowedBooks = async(req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    try{

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = decoded;

        const username = req.user.username
        const user = await User.findOne({username})

        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const borrowedBooks = await Book.find({borrower: user._id});

        res.json(borrowedBooks);

    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
}

module.exports = {
    getAllBooks,
    getAllAvailableBooks,
    getCategoryBooks,
    getCategoryAvailableBooks,
    borrowBook,
    listBorrowedBooks
}