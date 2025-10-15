import Booking from "../models/Booking.js";


export const userBooking= async(req,res,next)=> {
    res.status(200).json({
        success:true,
        message: "will return all the user specific bookings"
    })

}