import { getAuth, clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import ShowTime from "../models/ShowTime.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorHandle.js";
import Show from "../models/Show.js";

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
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = await clerkClient.users.getUser(userId);
        const isAdmin = user.privateMetadata?.role === "admin";

        if (!isAdmin) {
            return res.status(403).json({ success: false, message: "Access denied. Admin only." });
        }
        const show = await Show.create({
            ...req.body,
            release_date: new Date(req.body.release_date),
        });
        console.log("Created Show:", show); // Debugging line
        if (!show) {
            return next(new ErrorResponse("Show could not be created", 400));
        }

        res.status(200).json({
            success: true,
            show,
            message: "New show created successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const createShowTime = async (req, res, next) => {
  try {
    // --- Admin Authorization ---
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await clerkClient.users.getUser(userId);
    const isAdmin = user?.privateMetadata?.role === "admin";
    if (!isAdmin) return res.status(403).json({ success: false, message: "Access denied" });

    // --- Input ---
    const { showId, showsInput, showPrice } = req.body;

    if (!Array.isArray(showsInput) || showsInput.length === 0) {
      return next(new ErrorResponse("No show times provided", 400));
    }

    const show = await Show.findById(showId);
    if (!show) return next(new ErrorResponse(`${showId}: show not found`, 404));

    let showsToCreate = [];

    showsInput.forEach((element) => {
      if (!element.date || !Array.isArray(element.time) || element.time.length === 0) {
        return next(new ErrorResponse("Invalid date/time format", 400));
      }

      element.time.forEach((item) => {
        const showDateTime = new Date(`${element.date}T${item}`);
        showsToCreate.push({
          showId,
          showDateTime,
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length > 0) {
      await ShowTime.insertMany(showsToCreate, { ordered: false });
    }

    res.status(201).json({
      success: true,
      message: "Showtimes added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateShow = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = await clerkClient.users.getUser(userId);
        const isAdmin = user?.privateMetadata?.role === "admin";

        if (!isAdmin) {
            return res.status(403).json({ success: false, message: "Access denied. Admin only." });
        }

        const showId = req.params.id;
        const updateData = req.body;

        const updatedShow = await Show.findByIdAndUpdate(showId, updateData, { new: true });

        if (!updatedShow) {
            return next(new ErrorResponse("Show not found or could not be updated", 404));
        }
        res.status(200).json({
            success: true,
            show: updatedShow,
            message: "Show updated successfully",
        });

    } catch (error) {
        next(error);
    }
}

export const getAdminShowTimesByShow = async (req, res, next) => {
  try {
    const { showId } = req.params;

    const show = await Show.findById(showId);
    if (!show) {
      return next(new ErrorResponse("Show not found", 404));
    }

    const showTimes = await ShowTime.find({ showId })
      .sort({ showDateTime: 1 });

    res.status(200).json({
      success: true,
      show,
      showTimes,
    });
  } catch (error) {
    next(error);
  }
};
