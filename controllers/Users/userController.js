const Book = require("../../models/book");

const getAllBooks = async (req, res) => {
    try{

        const books = await Book.find();
        res.json(books);

    }catch(error){
        res.status(401).json({error: "Can't get All Books"})
    }
}

module.exports = {
    getAllBooks,
}