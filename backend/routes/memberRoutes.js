import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addComment, setStatus } from "../controllers/memberControllers.js";

const router = express.Router();
//set status
router.post("/setstatus/:id", authMiddleware, setStatus);

//post comments
router.post("/postcomment/:id", authMiddleware, addComment);

export default router;
