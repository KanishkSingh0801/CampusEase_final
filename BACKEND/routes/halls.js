import express from "express";
import {
  createHall,
  getAllHalls,
  getHall,
  updateHall,
  addAHall,
  deleteHall,
} from "../controllers/halls.js";
import { protectUserRoutes } from "../middleware/authmiddleware.js";
import { protectAdminRoutes } from "../middleware/adminVerify.js";

const router = express.Router();

// CREATE Hall - Admin only
router.post("/", protectAdminRoutes, createHall);

// GET Hall - No protection, publicly accessible
router.get("/", getHall);

// GET ALL Halls - Admin only
// router.get("/getAllHalls", protectAdminRoutes, getAllHalls);
router.get("/getAllHalls", getAllHalls);


// UPDATE Hall - Admin only
router.put("/updateHall/:id", protectAdminRoutes, updateHall);

// ADD Hall - Admin only
router.post("/addAHall", protectAdminRoutes, addAHall);

// DELETE Hall - Admin only
router.delete('/deleteHall/:id', protectAdminRoutes, deleteHall);

export default router;
