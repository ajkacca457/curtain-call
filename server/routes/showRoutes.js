import express from 'express';
import {getActiveShows, getSingleShow, createSingleShow,createShowTime} from "../controllers/showController.js";
import { protectAdminRoutes } from '../middlewares/auth.js';

const router= express.Router();

router.get("/active-shows",protectAdminRoutes,getActiveShows);
router.get("/:id",getSingleShow);
router.post("/",createSingleShow);
router.post("/add-show-time",createShowTime);

export default router;