import Booking from "../models/Booking.js";
import ErrorResponse from "../utils/ErrorHandle.js";
import { clerkClient } from "@clerk/express";


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


export const addFavorite = async (req, res, next) => {
    try {
        const { showId } = req.body;
        const userId = req.auth().userId;

        const user = await clerkClient.users.getUser(userId);

        if (!user) {
            return next(new ErrorResponse(404, "User not found"));
        }

        if (!user.privateMetadata.favorites) {
            user.privateMetadata.favorites = [];
        }

        if (!user.privateMetadata.favorites.includes(showId)) {
            user.privateMetadata.favorites.push(showId);
        }

        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: user.privateMetadata
        });

        res.status(200).json({
            success: true,
            message: "Show is added to favorites successfully"
        })

    } catch (error) {
        next(error);
    }

}