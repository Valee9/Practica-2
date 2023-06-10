const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema ({
    id: String,
    code: String,
    name: String,
    faculty: String
})

module.exports = mongoose.model('users', usersSchema);