import Booking from "../models/Booking.js";
import ErrorResponse from "../utils/ErrorHandle.js";


export const userBooking = async (req, res, next) => {

    try {
        const user = req.auth().userId;

        const bookings = await Booking.find({ user }).populate({
            path: "showTime",
            populate: { path: "show" }
        }).sort({ createdAt: -1 });

        if (bookings.length < 1) {
            return next(new ErrorResponse(404, "user has no available bookings"));
        }

        res.status(200).json({
            success: true,
            bookings
        })


    } catch (error) {
        next(error)
    }

}