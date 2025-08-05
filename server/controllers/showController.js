import Show from "../models/Show.js";
import ShowTime from "../models/ShowTime.js";
import ErrorResponse from "../utils/ErrorHandle.js";

export const getActiveShows = async (req, res, next) => {
    try {
        const shows = await Show.find({});

        if (!shows) {
            return next(new ErrorResponse("no active shows found", 404))
        }
        res.status(200).json({
            success: true,
            message: "this will get all the current shows",
            shows,
            totalActiveShows: shows.length
        })

    } catch (error) {
        next(error)
    }
};


export const getSingleShow = async (req, res, next) => {
    try {
        const show = await Show.findById(req.params.id);

        if (!show) {
            return next(new ErrorResponse(`show with ${req.params.id} is not available`, 404))
        }

        res.status(200).json({
            success: true,
            show,
            message: `${req.params.id} show is available`
        })

    } catch (error) {
        next(error);
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