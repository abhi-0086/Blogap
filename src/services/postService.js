const Post = require("../models/Post");
const mongoose = require("mongoose");

/**
 * Create a new post
 * @param {Object} postData - Post data from the request
 * @returns {Object} - Newly created post
 */
exports.createPost = async (postData) => {
  try {
    const post = new Post(postData);
    return await post.save();
  } catch (err) {
    console.log(err);
    throw new Error("Error creating the post : " + err.message);
  }
};

/**
 * Fetch a post by its slug
 * @param {String} slug - Slug of post
 * @returns {Object} - Found post
 */
exports.getPostBySlug = async (slug) => {
  try {
    const post =  await Post.findOne({ slug })
      .populate("category")
      .populate("tag")
      .populate("author", "-password");
    
    if(!post){
      throw new Error("Post not found with provided slug")
    }
    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching the required post : " + err.message);
  }
};

/**
 * Fetch all posts with optional filters
 * @param {Object} filters - Query filters (e.g. category, tag)
 * @returns {Array} - List of posts
 */
exports.getAllPost = async (filters = {}) => {
  try {
    const posts =  await Post.find(filters)
      .populate("category")
      .populate("tag")
      .populate("author", "-password")
      .sort({ createdAt: -1 });
    
    if (!posts || posts.length === 0) {
      return []; // Return empty array if no posts are found
    }
    return posts;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching posts : " + err.message);
  }
};

/**
 * Update a post by its slug
 * @param {String} slug - Slug of post to be updated
 * @param {Object} postData - Post data from the request
 * @returns {Object} - Newly created post
 */
exports.updatePostBySlug = async (slug, updatedPostData) => {
    try{
        const updatedPost = await Post.findOneAndUpdate({slug}, updatedPostData, {
            new:true,
            runValidators:true
        });
        if(!updatedPost){
          throw new Error("Error deleting the post");
        }
        return updatedPost;
    }catch(err){
        console.log(err);
        throw new Error("Error updating the post : "+ err.message);
    }
};

/**
 * Delete a post by its slug
 * @param {String} slug - Slug of post to be deleted
 * @returns {Object} - Deleted post
 */
exports.deletePostBySlug = async (slug) => {
    try{
        const deletedPost = await Post.findOneAndDelete({slug});
        if(!deletedPost){
          throw new Error(`Post with '${slug}' not found`);
        }
        return deletedPost;
    }catch(err){
      console.log(err);
        throw new Error("Error deleting the Post : ", err.message);
    }
};
