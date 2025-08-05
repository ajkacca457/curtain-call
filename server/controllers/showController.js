import Show from "../models/Show.js";
import ErrorResponse from "../utils/ErrorHandle.js";

export const getActiveShows = async (req, res, next) => {
    try {
        const shows = await Show.find();

        if (!shows) {
            return next(new ErrorResponse("no active shows found", 404))
        }
        res.status(200).json({
            success: true,
            message: "this will get all the current shows",
            shows,
            totalActiveShows:shows.length
        })

    } catch (error) {
        next(error)
    }
};


export const getSingleShow= async(req,res,next) => {
    try {
        const show = await Show.findById(req.params.id);

        if(!show) {
            return next(new ErrorResponse(`show with ${req.params.id} is not available`, 404))
        }

        res.status(200).json({
            success:true,
            show,
            message:`${req.params.id} show is available`
        })
        
    } catch (error) {
        next(error);        
    }
}