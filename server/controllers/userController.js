import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc        Auth user and get token
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // set JWT as HTTP only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send("Invalid email or password");
  }
});

// @desc        Register User
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
  res.json("register user");
});

// @desc        Logout User and clear cookie
// @route       POST /api/users/logout
// @access      Private
const logoutUser = asyncHandler(async (req, res) => {
  // Clear cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Successfully logged out" });
});

// @desc        Get User Profile
// @route       POST /api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.json("GEt user profile");
});

// @desc        Update User Profile
// @route       PUT /api/users
// @access      Private/Admin
const updateUserProfile = asyncHandler(async (req, res) => {
  res.json("Update user profile");
});

// @desc        Get All Users
// @route       PUT /api/users
// @access      Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({ message: "Get All Users", users });
});

// @desc        Get Use By Id
// @route       PUT /api/users:id
// @access      Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ message: "Get user by id", user });
});

// @desc        Delete User
// @route       DELETE /api/users:id
// @access      Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.json("Delete user profile");
});

// @desc        Update User
// @route       PUT /api/users:id
// @access      Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.json("Update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
