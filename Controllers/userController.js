import User from "../models/user.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

// Login user controller with JWT token
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        type: user.type,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Return response (without password)
    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};
