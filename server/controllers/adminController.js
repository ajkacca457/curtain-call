import { populate } from "dotenv";
import Booking from "../models/Booking.js";
import ShowTime from "../models/ShowTime.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorHandle";

export const userIsAdmin= async (req,res,next)=> {
    res.status(200).json({
        success:true,
        isAdmin:true
    })
}


export const getAdminDashboardData= async (req,res,next)=> {

    try {

        const confirmedBookings= await Booking.find({isPaid:true});
        const allActiveShows= await ShowTime.find({showDateTime:{$gte: new Date()}}).populate("show");
        const totalUsers= await User.countDocuments();

        const dashboardData= {
            totalBookings: confirmedBookings.length,
            totalRevenue: confirmedBookings.reduce((acc,booking)=> {
                acc+ booking.amount
            },0),
            activeShowTImes: allActiveShows,
            totalUsers
        }

        res.status(200).json({
            success:true,
            dashboardData
        })

        
    } catch (error) {
        next (error)
    }
}


export const getAllDashboardShowTIme= async (req,res,next)=> {
    try {
        const showTimes= await ShowTime.find({showDateTime:{$gte: new Date()}}).populate("show").sort({showDateTime:1});

        if(!showTimes || showTimes.length<1) {
            return next(new ErrorResponse(404, "there are no time slots available for shows"));
        }
        
        res.status(200).json({
            success:true,
            showTimes
        })
        
    } catch (error) {
        next(error)
        
    }
}


export const getAllBookings= async(req,res,next)=> {
    try {
        const bookings= await Booking.find({}).populate("user").populate({
            path:"showTime",
            populate: {path:"show"}
        }).sort({createdAt:-1});

        if(!bookings || bookings.length<1) {
            return next(new ErrorResponse(404, "no bookings made for any shows"));
        }

        res.status(200).json({
            success:true,
            bookings
        })       
    } catch (error) {
        next(error)        
    }
}