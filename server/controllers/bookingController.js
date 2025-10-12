import { err } from "inngest/types";
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

        const isAvailable = checkAvailability(showTimeId, selectedSeats);

        if (!isAvailable) {
            return next(new ErrorResponse("seats are not available for booking", 404))

        }

        const showTimeData = await ShowTime.findById(showTimeId).populate("show");

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

        res.json({
            success: true,
            occupiedSeats
        })

    } catch (error) {
        next(error)
    }
}