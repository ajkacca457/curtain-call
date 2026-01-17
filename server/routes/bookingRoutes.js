import express from "express"
import { createBooking, getOccupiedSeats, holdSeats, testRoute } from "../controllers/bookingController.js";
import { requireAuth } from "@clerk/express";


const router= express.Router();

router.get("/test", testRoute);
router.post("/hold-seats",holdSeats);
router.post("/create-booking", requireAuth(),createBooking);
router.get("/seats/:showTimeId",getOccupiedSeats);

export default router;