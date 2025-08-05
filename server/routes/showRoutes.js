import express from 'express';
import {getActiveShows, getSingleShow} from "../controllers/showController.js";

const router= express.Router();

router.get("/active-shows",getActiveShows);
router.get("/:id",getSingleShow);

export default router;