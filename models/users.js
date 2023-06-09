const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    id: String,
    code: String,
    name: String,
    faculty: String
})

const ModelUser = mongoose.model('users', usersSchema);
module.exports = ModelUser;