const mongoose = require("mongoose");
const slugify = require("slugify");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tag name is required"],
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "Tag slug is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//generate slug before saving
tagScema.pre("save", function (next) {
  if (this.isModified(this.name)) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = new mongoose.model("Tag", tagSchema);
