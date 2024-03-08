import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc        Auth user and get token
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler(async (req, res) => {
  res.json("Auth");
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
  res.json({ message: "Logout user" });
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
