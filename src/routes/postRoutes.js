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

/**
 * @swagger
 * /api/v1/post:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post with the provided data.
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *                 description: The ObjectId of the category for the post (reference to the Category collection).
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: An array of ObjectIds for the tags (references to the Tag collection).
 *     responses:
 *       201:
 *         description: Post created successfully.
 *       400:
 *         description: Invalid data provided.
 *       401:
 *         description: Unauthorized.
 */
//Route : Create a new post
router.post("/", auth, validatePostData, createPostController);

/**
 * @swagger
 * /api/v1/post/{slug}:
 *   put:
 *     summary: Update an existing post
 *     description: Updates an existing post by its slug.
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: The slug of the post to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *       400:
 *         description: Invalid data provided.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden to update this post.
 *       404:
 *         description: Post not found.
 */
//Route : update any existing post
router.put(
  "/:slug",
  auth,
  validateSlug,
  authorizePostAccess,
  updatePostBySlugController
);

/**
 * @swagger
 * /api/v1/post/{slug}:
 *   delete:
 *     summary: Delete a post
 *     description: Deletes a post by its slug.
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: The slug of the post to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden to delete this post.
 *       404:
 *         description: Post not found.
 */

//Route: Delete a post
router.delete(
  "/:slug",
  auth,
  validateSlug,
  authorizePostAccess,
  deletePostBySlugController
);

/**
 * @swagger
 * /api/v1/post/{slug}:
 *   get:
 *     summary: Get a single post by slug
 *     description: Retrieves a single post using its slug.
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: The slug of the post to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post found and returned successfully.
 *       404:
 *         description: Post not found.
 */
//Route: Get a single post by slug
router.get("/:slug", validateSlug, getPostBySlugController);

/**
 * @swagger
 * /api/v1/post:
 *   get:
 *     summary: Get all posts
 *     description: Retrieves a list of all posts.
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: List of posts returned successfully.
 */
//Route: Get All posts
router.get("/", getAllPostsController);

module.exports = router;
