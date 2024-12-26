const createResponse = require("../utils/responseStructure");
const {
  createPost,
  getAllPost,
  getPostBySlug,
  updatePostBySlug,
  deletePostBySlug,
} = require("../services/postService");

exports.createPostController = async (req, res) => {
  try {
    const postData = req.body;
    //console.log(postData);
    // add the user id to the post data
    const author = req.user.id;
    postData.author = author;
    //console.log(postData);
    const newPost = await createPost(postData);
    return res
      .status(201)
      .json(createResponse(201, "Post created successfully", newPost));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(createResponse(500, "Error creating post", error.message));
  }
};

exports.updatePostBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    //console.log(slug)
    const updateData = req.body;
    //console.log(updateData);
    const updatedPost = await updatePostBySlug(slug, updateData);

    if (!updatedPost) {
      return res
        .status(404)
        .json(createResponse(404, "Post not found for updation"));
    }
    return res
      .status(200)
      .json(createResponse(200, "Post updated successfully", updatedPost));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(createResponse(500, "Error updating the post", error.message));
  }
};

exports.deletePostBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    const deletedPost = await deletePostBySlug(slug);
    if (!deletedPost) {
      return res
        .status(404)
        .json(createResponse(404, "Post not found for deletion"));
    }
    return res
      .status(200)
      .json(createResponse(200, "Post deleted successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(createResponse(500, "Error fetching post", error.message));
  }
};

exports.getPostBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await getPostBySlug(slug);
    if (!post) {
      return res.status(404).json(createResponse(404, "Post not found"));
    }
    return res
      .status(200)
      .json(createResponse(200, "Post retrieved successfully", post));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(createResponse(500, "Error fetching post", error.message));
  }
};

exports.getAllPostsController = async (req, res) => {
  try {
    const filters = req.query;
    const posts = await getAllPost(filters);

    return res
      .status(200)
      .json(createResponse(200, "Posts retrieved successfully", posts));
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(createResponse(500, "Error fetching posts", error.message));
  }
};
