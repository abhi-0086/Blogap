const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
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

//middleware to check if username/email already exists
userSchema.pre('save', async function (next){
  try{ 
    const existingUser = await mongoose.model('User').findOne({
      $or:[{email: this.email}, {username :this.username}]
    });
    if(existingUser){
      const error = new Error('Username or email already exists');
      error.status = 400;
      return next(error);
    }
  }catch(error){
    return next(error) //db error
  }
  next();
});

//middleware to validate the email format
userSchema.pre('save', function (next){
  const eamilRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if(!eamilRegex.test(this.email)){
    const error = new Error('Invalid email !');
    error.status = 400;
    return next(error)
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
