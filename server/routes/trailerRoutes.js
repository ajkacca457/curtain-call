import express from "express";
import { getAllTrailers, getTrailerByShow } from "../controllers/trailerController.js";

const router = express.Router();

router.get("/", getAllTrailers); // Get all trailers
router.get("/:showId", getTrailerByShow); // Get trailer for a specific show

export default router;
