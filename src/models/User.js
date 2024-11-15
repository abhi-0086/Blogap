const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      maxlength: 250,
    },
    profilePicture: {
      type: String,
    },
    displayName: {
      type: String,
    },
    website: {
      type: String,
    },
    socilaLinks: {
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
    },
    location: { type: String },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    followerIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    followingIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    postCount: {
      type: Number,
      default: 0,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["reader", "author", "editor", "admin"],
      default: "reader",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
