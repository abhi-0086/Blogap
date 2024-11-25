const express = require('express')
const auth = require('../middleware/auth')
const validatePostData = require('../middleware/post/validatePostData');
const authorizePostAccess = require('../middleware/post/authorizePostAccess');
const validateSlug = require('../middleware/post/validateSlug');
const {createPost, updatePost, deletePost, getPost, getAllPosts} = require('../controllers/postController');

const router = express.Router();

//Route : Create a new post
router.post("/", auth, validatePostData, createPost);

//Route : update any existing post
router.put("/:slug", auth, validateSlug, authorizePostAccess, validatePostData, updatePost);

//Route: Delete a post
router.delete("/:slug", auth, validateSlug, authorizePostAccess, deletePost);

//Route: Get a single post by slug 
router.get("/:slug", validateSlug, getPost);

//Route: Get All posts
router.get("/", getAllPosts);

module.exports = router;