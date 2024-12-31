const {createCategory, getAllCategories, getCategoryById} = require('../services/categoryService');
const createResponse = require('../utils/responseStructure');



exports.createCategoryController = async (req, res) => {
    try {
        const categoryData = req.body;
        const category = await createCategory(categoryData);
        res.status(201).json(createResponse(201, 'Category created successfully', category));
    } catch (error) {
        res.status(500).json(createResponse(500, error.message));
    }
};

exports.getAllCategoryController = async (req, res) => {
    try {
        const categories = await getAllCategories();
        if(categories.length === 0){
            return res.status(404).json(createResponse(404, 'No categories found'));
        }
        res.status(200).json(createResponse(200, 'Categories retrieved successfully', categories));
    } catch (error) {
        res.status(500).json(createResponse(500, error.message));
    }
};

exports.getCategoryByIdController = async (req, res) => {
    try {
        console.log(req.params.id);
        const category = await getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json(createResponse(404, 'Category not found'));
        }
        res.status(200).json(createResponse(200, 'Category retrieved successfully', category));
    } catch (error) {
        res.status(500).json(createResponse(500, error.message));
    }
};