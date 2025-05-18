import User from "../models/user.js";
import argon2 from "argon2";

// Create user controller with password hashing
export const createUser = async (req, res) => {
  try {
    const { user_id, name, email, password, profile_img, bio, type } = req.body;

    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password);

    const newUser = new User({
      user_id,
      name,
      email,
      password: hashedPassword, // Save hashed password
      profile_img,
      bio,
      type,
    });

    const savedUser = await newUser.save();

    // Never send password back in the response
    const userToSend = savedUser.toObject();
    delete userToSend.password;

    return res.status(201).json({
      message: "User created successfully",
      user: userToSend,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      message: "Server error while creating user",
      error: error.message,
    });
  }
};
