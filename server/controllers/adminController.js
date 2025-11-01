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
        next(error);
    }
};



export const getAllDashboardShowTime = async (req, res, next) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please sign in.",
            });
        }

        // ✅ Get Clerk user details to verify role
        const clerkUser = await clerkClient.users.getUser(userId);
        const isAdmin = clerkUser.privateMetadata?.role === "admin";

        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }

        // ✅ Fetch upcoming showtimes and populate Show data
        const showTimes = await ShowTime.find({
            showDateTime: { $gte: new Date() },
        })
            .populate("showId")
            .sort({ showDateTime: 1 });

        if (!showTimes?.length) {
            // Optional: Return empty array instead of throwing an error
            return res.status(200).json({
                success: true,
                showTimes: [],
                message: "No upcoming showtimes available.",
            });
        }

        // ✅ Send response
        res.status(200).json({
            success: true,
            count: showTimes.length,
            showTimes,
        });
    } catch (error) {
        next(error);
    }
};


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

export const createSingleShow = async (req, res, next) => {
    console.log(req.body);
    try {
        const show = await Show.create(req.body);

        if (!show) {
            return next(new ErrorResponse("show cant be created", 400));
        }

        res.status(200).json({
            success: true,
            show,
            message: `new show created`
        })

    } catch (error) {
        next(error);
    }
}

export const createShowTime = async (req, res, next) => {
    try {
        const { showId, showsInput, showPrice } = req.body;

        const show = await Show.findById(showId);

        if (!show) {
            return next(new ErrorResponse(`${showId}:show is not a active show`), 400);
        }

        let showsToCreate = [];

        showsInput.forEach(element => {
            const showdate = element.date;
            element.time.forEach(item => {
                const showDateTime = `${showdate}T${item}`
                const showtime = {
                    showId,
                    showDateTime: new Date(showDateTime),
                    showPrice,
                    occupiedSeats: {}
                }
                showsToCreate.push(showtime);
            })

        });

        if (showsToCreate.length > 0) {
            await ShowTime.insertMany(showsToCreate);
        }
        res.status(200).json({
            success: true,
            message: "new show times are added"

        })

    } catch (error) {
        next(error)
    }

}