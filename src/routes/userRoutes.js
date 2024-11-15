const express = require('express');
const {getUser, updateUser} = require('../controllers/userController')
const auth = require('../middleware/auth')

//express router
const router = express.Router();

//get user profile
router.get('/profile', auth, getUser);

//update user profile data
router.put('/profile', auth, updateUser);

module.exports = router;
