import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    adminId: {
      type: Number,
      required: true,
      unique: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    department: {
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
    isAdmin: {
      type: Boolean,
      default: true, // make sure all users from this schema are admins
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
