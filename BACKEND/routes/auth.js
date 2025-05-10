import express from "express";
// import { authUser, registerUser, checkusername } from "../controllers/auth.js";
import { authUser, registerUser, verifyuser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);

router.get('/verifyuser', verifyuser);
// router.get("/checkusername", checkusername);

export default router;
