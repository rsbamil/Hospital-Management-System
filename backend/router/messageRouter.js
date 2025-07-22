import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
import express from "express";

const router = express.Router();

// to send message
router.post("/send", sendMessage);

// router to get all messages
router.get("/getAll", isAdminAuthenticated, getAllMessages);
export default router;
