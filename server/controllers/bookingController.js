import ShowTime from "../models/ShowTime.js";
import ErrorResponse from "../utils/ErrorHandle.js";
import Booking from "../models/Booking.js";
import Stripe from "stripe";
import { getAuth } from "@clerk/express";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const TEMP_HOLD_MINUTES = 15;


const checkAvailability = async (showTimeId, selectedSeats) => {
    try {
        const showTimeData = await ShowTime.findById(showTimeId);
        if (!showTimeData) return false;

        const occupiedSeats = showTimeData.occupiedSeats;

        const isSeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isSeatTaken;

    } catch (error) {
        console.log(error);
    }

}


export const createBooking = async (req, res, next) => {

    try {

        const { userId } = req.auth();
        const { showTimeId, selectedSeats } = req.body;
        const { origin } = req.headers;

        const isAvailable = await checkAvailability(showTimeId, selectedSeats);

        if (!isAvailable) {
            return next(new ErrorResponse("seats are not available for booking", 404))

        }

        const showTimeData = await ShowTime.findById(showTimeId).populate("showId");

        if (!showTimeData) {
            return next(new ErrorResponse("show times are not available", 404))
        }

        const booking = await Booking.create({
            user: userId,
            showTime: showTimeId,
            amount: showTimeData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats
        })

        // update occupied seats 

        selectedSeats.map((seat) => {
            showTimeData.occupiedSeats[seat] = userId;
        })

        showTimeData.markModified('occupiedSeats');

        await showTimeData.save();

        // strip gateway initialization

        res.status(200).json({
            success: true,
            message: "Booking successful",
            bookingId: booking._id,
            showTimeId,
        })
    } catch (error) {
        next(error);
    }
}


export const getOccupiedSeats = async (req, res, next) => {

    try {
        const { showTimeId } = req.params;
        const showTimeData = await ShowTime.findById(showTimeId);

        if (!showTimeData) {
            return next(new ErrorResponse(404, "show time is either expired or unavailable"));
        }

        const occupiedSeats = Object.keys(showTimeData.occupiedSeats);

        res.status(200).json({
            success: true,
            occupiedSeats
        })

    } catch (error) {
        next(error)
    }
}

export const holdSeats = async (req, res, next) => {
    try {
        const { userId, showTimeId, selectedSeats } = req.body;

        if (!selectedSeats || selectedSeats.length === 0) {
            return next(new ErrorResponse("No seats selected", 400));
        }

        const showTime = await ShowTime.findById(showTimeId);
        if (!showTime) {
            return next(new ErrorResponse("Show time not found", 404));
        }
        const now = new Date();

        // Clean up expired temporary holds
        for (const [seat, hold] of Object.entries(showTime.temporaryHolds)) {
            if (hold.expiresAt < now) {
                delete showTime.temporaryHolds[seat];  // ✅ proper way to delete key from object
            }
        }
        // Check if any requested seats are permanently occupied
        const occupiedSeats = Object.keys(showTime.occupiedSeats || {});
        const tempOccupied = Object.keys(showTime.temporaryHolds || {}).filter(
            (seat) => showTime.temporaryHolds[seat].userId !== userId
        );

        const conflictSeats = selectedSeats.filter(
            (seat) => occupiedSeats.includes(seat) || tempOccupied.includes(seat)
        );

        if (conflictSeats.length > 0) {
            return next(
                new ErrorResponse(
                    `These seats are already taken: ${conflictSeats.join(", ")}`,
                    409
                )
            );
        }

        const expiresAt = new Date(now.getTime() + TEMP_HOLD_MINUTES * 60000); // 15 mins
        selectedSeats.forEach((seat) => {
            showTime.temporaryHolds[seat] = { userId: userId.toString(), expiresAt };
        });

        showTime.markModified("temporaryHolds");
        await showTime.save();
        res.status(200).json({
            success: true,
            message: "Seats temporarily held",
            temporaryHolds: showTime.temporaryHolds,
        });
    } catch (err) {
        next(err);
    }

}

export const createStripeSession = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized User" });

        const { showTimeId, selectedSeats, show } = req.body;
        if (!showTimeId || !selectedSeats?.length || !show) {
            return res.status(400).json({ message: "Missing booking data" });
        }

        const pricePerSeat = show.showPrice || 350;
        const totalAmount = pricePerSeat * selectedSeats.length;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "eur", // or "usd"
                        product_data: {
                            name: show.title,
                            description: `Seats: ${selectedSeats.join(", ")}`
                        },
                        unit_amount: totalAmount * 100, // cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.FRONTEND_URL}/payment-success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
            metadata: {
                clerkUserId: userId,
                showTimeId,
                seats: JSON.stringify(selectedSeats),
            },
        });

        res.status(200).json({ url: session.url });
    } catch (err) {
        next(err);
    }
};


export const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const clerkUserId = session.metadata.clerkUserId;
      const showTimeId = session.metadata.showTimeId;
      const selectedSeats = JSON.parse(session.metadata.seats);

      const showTime = await ShowTime.findById(showTimeId);
      if (!showTime) throw new Error("ShowTime not found");

      // Move seats from temporary → occupied
      selectedSeats.forEach((seat) => {
        showTime.occupiedSeats[seat] = clerkUserId;
        showTime.temporaryHolds?.delete(seat);
      });

      showTime.markModified("occupiedSeats");
      showTime.markModified("temporaryHolds");
      await showTime.save();

      // Create booking
      await Booking.create({
        user: clerkUserId,
        showTime: showTimeId,
        bookedSeats: selectedSeats,
        amount: session.amount_total / 100,
        isPaid: true,
        paymentIntentId: session.payment_intent, 
      });

    } catch (err) {
      console.error("Error processing webhook:", err);
      return res.status(500).json({ success: false });
    }
  }

  res.status(200).json({ received: true });
};