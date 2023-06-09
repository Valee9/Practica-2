const mongoose = require('mongoose');

const reservesSchema = new mongoose.Schema({
    user_id: String,
    book_id: String,
    reserved_at: Date
})

const ModelReserve = mongoose.model('reserves', reservesSchema);
module.exports = ModelReserve;