import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/authcontroller.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Get user route
router.get("/user", getUser);

export default router;
