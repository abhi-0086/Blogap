const Category = require("../models/Category");

/**
 * Create a new category.
 * @param {Object} categoryData - Data for the new category.
 * @param {string} categoryData.name - Name of the category.
 * @param {string} categoryData.description - Description of the category.
 * @returns {Promise<Object>} The created category document.
 */
exports.createCategory = async (categoryData) =>{
    try{
        //check if category already exists
        const existingCat = await Category.findOne({name: categoryData.name.trim()});
        if(existingCat){
            throw new Error("Category already exists");
        }

        //create new category
        const newCategory = new Category({
            name: categoryData.name.trim(),
            description: categoryData.description ? categoryData.description.trim() : ""
        });
        return await newCategory.save();
    }
    catch(err){
        console.log(err);
        throw new Error("Error creating category: " + err.message);
    };
}

/**
 * Fetch all categories.
 * @returns {Promise<Array>} List of categories.
 */
exports.getAllCategories = async () => { 
    try{
        const categories = await Category.find().sort({name: 1});
        return categories;
    }
    catch(err){
        console.log(err);
        throw new Error("Error fetching categories: " + err.message);
    }
}


exports.getCategoryById = async (id) => {
    try{
        const category = await Category.findOne({_id: id});
        if(!category){
            throw new Error("Category not found with provided id");
        }
        return category;
    }
    catch(err){
        console.log(err);
        throw new Error("Error fetching the required category: " + err.message);
    }
}