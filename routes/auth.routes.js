import express from "express";
import { adminPage, getprofile, login, register } from "../controller/auth.controller.js";
import { logger } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.get("/profile", getprofile)
router.get("/admin", adminPage)

export default router;