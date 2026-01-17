import express from "express"
import { createBooking, getOccupiedSeats } from "../controllers/bookingController.js";
import { requireAuth } from "@clerk/express";


const router= express.Router();

router.post("/create-booking", requireAuth(),createBooking);
router.get("/seats/:showTimeId",getOccupiedSeats);


export default router;