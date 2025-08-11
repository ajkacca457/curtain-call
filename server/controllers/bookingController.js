import { err } from "inngest/types";
import ShowTime from "../models/ShowTime.js";
import ErrorResponse from "../utils/ErrorHandle.js";


const checkAvailability = async (showId, selectedSeats) => {
    try {
        const showTimeData = await ShowTime.findById(showId);
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
        const { showId, selectedSeats } = req.body;
        const { origin } = req.headers;

        const isAvailable = checkAvailability(showId, selectedSeats);

        if (!isAvailable) {
            return next(new ErrorResponse("seats are not available for booking", 404))

        }

        const showTimeData = await ShowTime.find({showId});


        res.status(200).json({
            success: true,
            showTimeData,
            isAvailable
        })
    } catch (error) {
        next(error);
    }

}