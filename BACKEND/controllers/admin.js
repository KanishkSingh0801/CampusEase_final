import asyncHandler from "express-async-handler";
import User from "../models/AdminModel.js";
import { generateToken } from "../config/genrateToken.js";
import bcrypt from "bcryptjs";
// const JWT_SECRET=process.env.JWT_SECRET;
export const registerAdmin = asyncHandler(async (req, res) => {
  const { adminId, adminName, department, password, email } = req.body;
  if (!adminId || !adminName || !password || !department || !email) {
    return res.status(400).json({ msg: "Please fill all required field" });
    // throw new Error( "Please fill all required field")
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(401).json({ msg: "User with this email already exist." });
    // throw new Error("User with this email already exist.")
  }
  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(password, salt);

  const user = await User.create({
    adminId,
    email,
    adminName,
    password: secpass,
    department,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      adminId: user.adminID,
      adminName: user.adminName,
      department: user.department,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ msg: "failed to create user." });
  }
});

export const authAdmin = asyncHandler(async (req, res) => {
  console.log("Incoming Body:", req.body); // ADD THIS
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (user && passwordCompare) {
    res.status(200).json({
      _id: user._id,
      adminID: user.adminId,
      adminName: user.adminName,
      department: user.department,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ msg: "Invalid credentials." });
    //    throw new Error("Invalid credentials.");
  }
});

// export const restrictTo = () => {};
