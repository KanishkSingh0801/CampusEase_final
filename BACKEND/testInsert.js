import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/StudentModel.js"; // Adjust the path if needed
import bcrypt from "bcryptjs";

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

const testInsert = async () => {
  await connect();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("testpassword", salt);

  const newUser = new User({
    Student_ID: "2023123",
    Student_Name: "Test User",
    Department: "CSE",
    Password: hashedPassword,
    Email: "test@example.com",
  });

  try {
    await newUser.save();
    console.log("User Saved Successfully to Database");
    mongoose.connection.close(); // Close the connection after insertion
  } catch (error) {
    console.error("Error Saving User:", error);
    mongoose.connection.close();
  }
};

testInsert();
