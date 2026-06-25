import express from 'express';
import {getActiveShows, getAllShows, getSingleShow,getAllShowTime, getSingleShowTime, getFeaturedShows, getUpcomingShows, toggleShowActive} from "../controllers/showController.js";

const router= express.Router();

router.get("/featured", getFeaturedShows);
router.get("/upcoming-shows",getUpcomingShows);
router.patch("/toggle-active/:id", toggleShowActive);
router.get("/active-shows",getActiveShows);
router.get("/all-shows",getAllShows);
router.get("/all-show-timing",getAllShowTime);
router.get("/showtime/:showId",getSingleShowTime);
router.get("/:id",getSingleShow);


export default router;