import ShowTime from "../models/ShowTime.js";
import ErrorResponse from "../utils/ErrorHandle.js";
import Booking from "../models/Booking.js";


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


const TEMP_HOLD_MINUTES = 15;

export const holdSeats = async (req, res, next) => {
    try {
        const {userId, showTimeId, selectedSeats } = req.body;

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
                showTime.temporaryHolds.delete(seat);
            }
        }

        // Check if any requested seats are permanently occupied
        const occupiedSeats = Object.keys(showTime.occupiedSeats || {});
        const tempOccupied = Object.keys(showTime.temporaryHolds || {}).filter(
            (seat) => showTime.temporaryHolds[seat].userId !== userId
        );

        console.log("Occupied Seats:", occupiedSeats);
        console.log("Temp Occupied Seats:", tempOccupied);

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

        // Add temporary hold for selected seats
        const expiresAt = new Date(now.getTime() + TEMP_HOLD_MINUTES * 60000); // 15 mins
        selectedSeats.forEach((seat) => {
            showTime.temporaryHolds.set(seat, { userId, expiresAt });
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

export const testRoute = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Booking route is working fine"
    })
}