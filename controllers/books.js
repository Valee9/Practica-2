const booksModel = require('../models/book');

const getBooks = async function (req, res) {
    try {
        const books = await booksModel.find();
        res.status(200).json(books);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
};

module.exports = { getBooks };
