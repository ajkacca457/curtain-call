import express from 'express';
import {getActiveShows, getSingleShow,getAllShowTime, getSingleShowTime} from "../controllers/showController.js";

const router= express.Router();

router.get("/active-shows",getActiveShows);
router.get("/all-show-timing",getAllShowTime);
router.get("/showtime/:showId",getSingleShowTime)
router.get("/:id",getSingleShow);

export default router;