const express = require('express')
const { getUserList } = require('../controllers/users')
const router = express.Router();

router.get('/list1', getUserList);

module.exports = router;