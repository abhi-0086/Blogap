const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post title is required"],
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "Post slug is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  content: { type: String, required: [true, "Post content is required"] },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Post category is required"],
  },
  tag: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  media: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
  status: { type: Boolean, default: false },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Post must have an author"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: { type: Date, default: Date.now() },
});

//midlleware to create slug  statement before save
postSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

//Update the updatedAt field every time the post is modified
postSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = new mongoose.model("Post", postSchema);
