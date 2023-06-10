const mongoose = require('mongoose');

const reservesSchema = new mongoose.Schema ({
    user_id: String,
    book_id: String,
    reserved_at: Date
})

module.exports = mongoose.model('reserves', reservesSchema);

