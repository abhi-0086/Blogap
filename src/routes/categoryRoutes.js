const express = require('express');
const {getCategoryByIdController, getAllCategoryController, createCategoryController} = require('../controllers/categoryController');
const auth = require("../middleware/auth");

const router = express.Router();

// Route to get all categories
router.get('/', getAllCategoryController);

// Route to get a single category by ID
router.get('/:id', getCategoryByIdController);

// Route to create a new category
router.post('/', auth, createCategoryController);

module.exports = router;