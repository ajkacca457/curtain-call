import express from "express"
import { getOccupiedSeats, holdSeats, createStripeSession } from "../controllers/bookingController.js";
import { requireAuth } from "@clerk/express";


const router= express.Router();

router.post("/hold-seats",holdSeats);
router.post("/create-stripe-session", requireAuth(), createStripeSession);
router.get("/seats/:showTimeId",getOccupiedSeats);

export default router;