import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
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
  profile_img: {
    type: String,
  },
  bio: {
    type: String,
  },
  type: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
export default User;

// This code defines a Mongoose schema and model for a User entity in a MongoDB database. The schema includes fields for user ID, name, email, password, profile image, bio, and user type (either "user" or "admin"). The model is then exported for use in other parts of the application.
