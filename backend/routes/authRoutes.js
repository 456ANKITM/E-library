import express from "express";
import { getUserById, signin, signup } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router()

router.get("/user", protect, getUserById)
router.post("/signup", signup)
router.post("/signin", signin)

export default router;