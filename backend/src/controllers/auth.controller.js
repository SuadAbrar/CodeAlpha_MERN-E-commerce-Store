import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a token
    const token = generateToken(user._id);

    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (error) {
    console.error("registerUser error", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists and password is correct
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = generateToken(user._id);
    res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    console.error("loginUser error", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(sanitizeUser(user));
  } catch (error) {
    console.error("getProfile error", error);
    res.status(500).json({ message: "Server error" });
  }
};
