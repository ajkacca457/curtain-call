import { getAuth, clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import ShowTime from "../models/ShowTime.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorHandle.js";

export const userIsAdmin = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        res.status(200).json({
            success: true,
            isAdmin: true,
            user: userId
        })

    } catch (error) {
        next(error)
    }
}


export const getAdminDashboardData = async (req, res) => {
    try {
        const { userId } = req.auth(); // populated by requireAuth()

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const clerkUser = await clerkClient.users.getUser(userId);
        const isAdmin = clerkUser.privateMetadata?.role === "admin";

        if (!isAdmin) {
            return res.status(403).json({ success: false, message: "Access denied. Admin only." });
        }

        const confirmedBookings = await Booking.find({ isPaid: true });
        const allActiveShows = await ShowTime.find({ showDateTime: { $gte: new Date() } }).populate("showId");
        const totalUsers = await User.countDocuments();

        const totalRevenue = confirmedBookings.reduce(
            (acc, booking) => acc + (booking.amount || 0),
            0
        );

        const dashboardData = {
            totalBookings: confirmedBookings.length,
            totalRevenue,
            activeShowTimes: allActiveShows,
            totalUsers,
        };

        res.status(200).json({
            success: true,
            dashboardData,
        });
    } catch (error) {
        console.error("🔥 Dashboard controller error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export const getAllDashboardShowTime = async (req, res, next) => {
    try {
        const showTimes = await ShowTime.find({ showDateTime: { $gte: new Date() } }).populate("show").sort({ showDateTime: 1 });

        if (!showTimes || showTimes.length < 1) {
            return next(new ErrorResponse(404, "there are no time slots available for shows"));
        }

        res.status(200).json({
            success: true,
            showTimes
        })

    } catch (error) {
        next(error)

    }
}


export const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({}).populate("user").populate({
            path: "showTime",
            populate: { path: "show" }
        }).sort({ createdAt: -1 });

        if (!bookings || bookings.length < 1) {
            return next(new ErrorResponse(404, "no bookings made for any shows"));
        }

        res.status(200).json({
            success: true,
            bookings
        })
    } catch (error) {
        next(error)
    }
}