import express from 'express';
import {getActiveShows, getSingleShow,getAllShowTime, getSingleShowTime, getFeaturedShows, getUpcomingShows} from "../controllers/showController.js";

const router= express.Router();

router.get("/featured", getFeaturedShows);
router.get("/all-shows",getActiveShows);
router.get("/all-show-timing",getAllShowTime);
router.get("/showtime/:showId",getSingleShowTime);
router.get("/:id",getSingleShow);
router.get("/upcoming-shows",getUpcomingShows);


export default router;