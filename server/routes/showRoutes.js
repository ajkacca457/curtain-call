import express from 'express';
import {getActiveShows, getAllShows, getSingleShow,getAllShowTime, getSingleShowTime, getFeaturedShows, getUpcomingShows} from "../controllers/showController.js";

const router= express.Router();

router.get("/featured", getFeaturedShows);
router.get("/active-shows",getActiveShows);
router.get("/all-shows",getAllShows);
router.get("/all-show-timing",getAllShowTime);
router.get("/showtime/:showId",getSingleShowTime);
router.get("/:id",getSingleShow);
router.get("/upcoming-shows",getUpcomingShows);


export default router;