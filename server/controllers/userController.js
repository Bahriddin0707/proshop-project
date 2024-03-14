import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc        Auth user and get token
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
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
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });

  if (exist) {
    res.status(400);
    throw new Error("This user already exists");
  }

  const createdUser = await User.create({ name, email, password });

  if (createdUser) {
    generateToken(res, createdUser._id);

    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
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
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc        Update User Profile
// @route       PUT /api/users
// @access      Private/Admin
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
