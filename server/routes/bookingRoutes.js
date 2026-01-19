import express from "express"
import { createBooking, getOccupiedSeats, holdSeats, createStripeSession, stripeWebhookHandler } from "../controllers/bookingController.js";
import { requireAuth } from "@clerk/express";


const router= express.Router();

router.post("/hold-seats",holdSeats);
router.post("/create-booking", requireAuth(),createBooking);
router.post("/create-stripe-session", requireAuth(), createStripeSession);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler
);
router.get("/seats/:showTimeId",getOccupiedSeats);

export default router;