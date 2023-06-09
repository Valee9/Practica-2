const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    id: String,
    code: String,
    book: String,
    description: String
})

const ModelBook = mongoose.model('books', booksSchema);
module.exports = ModelBook;