const Book = require("../../models/book");

const CreateBook = async(req,res) => {

    try{

        const { name, author, description, category } = req.body;

        const book = new Book({name, author, description, category});
        await book.save();

        res.status(201).json({ message: 'You have been created Book successfully' })

    }catch(error){
        res.status(401).json({error: "Can't Create a Book"})
    }
}

module.exports = {
    CreateBook
}