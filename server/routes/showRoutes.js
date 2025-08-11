import express from 'express';
import {getActiveShows, getSingleShow, createSingleShow,createShowTime, getAllShowTime, dummyAllShow} from "../controllers/showController.js";
import { protectAdminRoutes } from '../middlewares/auth.js';

const router= express.Router();

router.get("/active-shows",getActiveShows);
router.get("/all-show-timing",getAllShowTime);
router.get("/:id",getSingleShow);
router.post("/",protectAdminRoutes,createSingleShow);
router.post("/add-show-time",createShowTime);

export default router;