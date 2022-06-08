import express from "express";
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();
import {
    registerUser, 
    loginUser, 
    getMe
} from "../controller/userController.js"

router.post("/", registerUser)

router.post("/login", loginUser)

router.get("/me", protect, getMe)

export default router;