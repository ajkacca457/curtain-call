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

export const getAllShowTime = async (req, res, next) => {
    try {
        // first get all the ShowTIme
        const showtimes = await ShowTime.find({ showDateTime: { $gte: new Date() } })
            .populate("showId")
            .sort({ showDateTime: 1 });

        if (showtimes.length === 0) {
            return next(new ErrorResponse("No show times available", 404));
        }
        // next create uniqueArrayMap

        const uniqueArrayMap = new Map();

        // now loop through the showtime array

        showtimes.forEach(item => {
            const show = item.showId;
            const showKey = show._id.toString();
            //check if key already exists in the map
            if (!uniqueArrayMap.has(showKey)) {
                uniqueArrayMap.set(showKey, { show, times: [] });
            }

            const entry = uniqueArrayMap.get(showKey);

            if (!entry.times.some(t => t.getTime() === item.showDateTime.getTime())) {
                entry.times.push(item.showDateTime)
            }

        })

        res.status(200).json({
            success: true,
            message: "All available show timings grouped by show",
            showtimes: Array.from(uniqueArrayMap.values())
        });


    } catch (error) {
        next(error);
    }
};

export const getSingleShowTime = async (req, res, next) => {

    try {
        const { showId } = req.params;

        const showtimes = await ShowTime.find({ showId, showDateTime: { $gte: new Date() } });

        const show = await Show.findById(showId);

        if (!show) {
            return next(new ErrorResponse("no show available", 404))

        }

        const dateTime = {};

        showtimes.forEach((item) => {
            const date = item.showDateTime.toISOString().split("T")[0];
            if (!dateTime[date]) {
                dateTime[date] = [];
            }
            dateTime[date].push({
                time: item.showDateTime,
                show
            })
        })
        res.status(200).json({
            success: true,
            dateTime,
            message: "All date and time for the shows"
        })

    } catch (error) {
        next(error)
    }


}


export const getFeaturedShows= async (req,res,next)=> {
try {
    const shows = await Show.find({isFeatured:true});

    if (!shows || shows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No featured shows found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "All currently featured shows retrieved successfully.",
      totalActiveShows: shows.length,
      shows,
    });
  } catch (error) {
    next(error);
  }

}