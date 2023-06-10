const express = require('express')
const { getUsers,getUserList,getBooksList } = require('../controllers/users')
const router = express.Router();

router.get('/',getUsers);
router.get('/list1', getUserList);
router.get('/list2', getBooksList);

module.exports = router;