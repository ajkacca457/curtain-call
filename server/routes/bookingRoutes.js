import express from "express"
import { createBooking, getOccupiedSeats } from "../controllers/bookingController.js";


const router= express.Router();

router.post("/create-booking",createBooking);
router.get("/seats/:shotTimeId");


export default router;