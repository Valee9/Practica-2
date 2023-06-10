const express = require('express');
const { getBooksList } = require('../controllers/books');
const router = express.Router();

router.get('/list2', getBooksList);

module.exports = router;