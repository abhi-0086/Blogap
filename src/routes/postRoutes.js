const express = require("express");
const auth = require("../middleware/auth");
const validatePostData = require("../middleware/post/validatePostData");
const authorizePostAccess = require("../middleware/post/authorizePostAccess");
const validateSlug = require("../middleware/post/validateSlug");
const {
  createPostController,
  updatePostBySlugController,
  deletePostBySlugController,
  getPostBySlugController,
  getAllPostsController,
} = require("../controllers/postController");

const router = express.Router();

//Route : Create a new post
router.post("/", auth, validatePostData, createPostController);

//Route : update any existing post
router.put(
  "/:slug",
  auth,
  validateSlug,
  authorizePostAccess,
  updatePostBySlugController
);

//Route: Delete a post
router.delete(
  "/:slug",
  auth,
  validateSlug,
  authorizePostAccess,
  deletePostBySlugController
);

//Route: Get a single post by slug
router.get("/:slug", validateSlug, getPostBySlugController);

//Route: Get All posts
router.get("/", getAllPostsController);

module.exports = router;
