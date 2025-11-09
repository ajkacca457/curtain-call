import express from "express";
import { getAllNews, createNews, deleteNews } from "../controllers/newsController.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

// Public route — all users can view news
router.get("/", getAllNews);

// Admin routes
router.post("/", requireAuth(), createNews);
router.delete("/:id", requireAuth(), deleteNews);

export default router;
