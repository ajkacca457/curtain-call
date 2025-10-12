import Booking from "../models/Booking.js";
import ShowTime from "../models/ShowTime.js";
import User from "../models/User.js";

export const userIsAdmin= async (req,res,next)=> {
    res.json({
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

        res.json({
            success:true,
            dashboardData
        })

        
    } catch (error) {
        next (error)
    }
}


export const getAllDashboardShowTIme= async (req,res,next)=> {
    try {
        const showTimes= await ShowTime.find({showDateTime:{$gte: new Date()}}).populate("show").sort({showDateTime:1})

        
    } catch (error) {
        
    }



}