const Book = require("../../models/book");

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

module.exports = {
    getAllBooks,
    getAllAvailableBooks,
    getCategoryBooks,
    getCategoryAvailableBooks
}