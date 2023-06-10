const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema(
    {
    id: String,
    code: String,
    book: String,
    description: String
    }
)
module.exports = mongoose.model('books', booksSchema)