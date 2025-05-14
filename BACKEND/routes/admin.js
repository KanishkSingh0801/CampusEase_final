import express from "express";
import { authAdmin, registerAdmin } from "../controllers/admin.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Register route with admin secret verification
router.post("/register", (req, res, next) => {
  const adminSecret = req.headers["x-admin-secret"];
  // If no secret or invalid secret, block the request
  if (adminSecret != process.env.ADMIN_SECRET) {
    return res.status(403).json({ msg: "Unauthorized access to registration" });
  }

  // Proceed to actual registration logic in controller
  return registerAdmin(req, res, next);
});

// Login route
router.post("/login", authAdmin);

export default router;
