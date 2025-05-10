import express from "express";
import { createHall, getAllHalls, getHall, updateHall, addAHall, deleteHall } from "../controllers/halls.js";
import { protectUserRoutes } from "../middleware/authmiddleware.js";
import { protectAdminRoutes } from "../middleware/adminVerify.js";

const router = express.Router();

//CREATE
router.post("/", protectAdminRoutes, createHall);

//GET Hall
router.get("/", getHall);

//GET ALL
router.get("/getAllHalls", getAllHalls);

router.put("/updateHall/:id", updateHall); // ID in URL

router.post("/addAHall", addAHall);

router.delete('/deleteHall/:id', deleteHall);


export default router;
