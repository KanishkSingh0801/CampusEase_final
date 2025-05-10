import express from "express";
import {
  createBooking,
  deleteBooking,
  getAdminBookings,
  getAllBookings,
  getAvailableTimes,
  getBooking,
  getUserBookings,
  updateBooking,
  verifyuser
} from "../controllers/booking.js";
import { protectUserRoutes } from "../middleware/authmiddleware.js";
import { protectAdminRoutes } from "../middleware/adminVerify.js";

const router = express.Router();

// General routes
// AVAILABLE SLOTS FOR PARTICULAR HALL
router.get("/availableslots", getAvailableTimes);

// User Routes
// GET User Bookings (Protected)
router.get("/userBookings", protectUserRoutes, getUserBookings);

// GET ALL BOOKINGS (Now Protected)
router.get("/allBookings", protectAdminRoutes, getAllBookings);

// User Verification Route
router.get("/verifyuser", verifyuser);

// Admin Routes
router.post("/createBooking", protectUserRoutes, createBooking);
router.get("/adminBookings", protectAdminRoutes, getAdminBookings);
router.delete("/deleteBooking", protectAdminRoutes, deleteBooking);
router.patch("/updateBooking", protectAdminRoutes, updateBooking);

// GET Booking by ID (Protected)
router.get("/:id", protectUserRoutes, getBooking);

export default router;
