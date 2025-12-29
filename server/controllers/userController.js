import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
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


export const toggleFavorite = async (req, res, next) => {
  try {
    const { showId } = req.body;
    const {userId} = req.auth();

    // Check if the show exists
    const show = await Show.findById(showId);
    if (!show) return next(new ErrorResponse(404, "Show not found"));

    // Get the user from Clerk
    const user = await clerkClient.users.getUser(userId);
    if (!user) return next(new ErrorResponse(404, "User not found"));


    if (!user.privateMetadata.favorites) {
      user.privateMetadata.favorites = [];
    }

    let message;

    if (user.privateMetadata.favorites.includes(showId)) {
      // Remove from favorites
      user.privateMetadata.favorites = user.privateMetadata.favorites.filter(id => id !== showId);
      message = "Show removed from favorites";
    } else {
      // Add to favorites
      user.privateMetadata.favorites.push(showId);
      message = "Show added to favorites";
    }

    // Update user metadata in Clerk
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: user.privateMetadata
    });

    res.status(200).json({
      success: true,
      message,
      favorites: user.privateMetadata.favorites
    });

  } catch (error) {
    next(error);
  }
};


export const getFavorites = async (req, res, next) => {

  try {
    const {userId} = req.auth();
    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return next(new ErrorResponse(404, "User is not exists"));
    }

    const favorites = user.privateMetadata.favorites;

    const shows = await Show.find({ _id: { $in: favorites } });

    res.status(200).json({
      success: true,
      shows
    })

  } catch (error) {
    next(error);
  }


}