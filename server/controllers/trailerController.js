import Trailer from "../models/Trailer.js";

export const getAllTrailers = async (req, res, next) => {
  try {
    const trailers = await Trailer.find({});
    res.status(200).json({
      success: true,
      trailers,
    });
  } catch (error) {
    next(error);
  }
};

export const getTrailerByShow = async (req, res, next) => {
  try {
    const { showId } = req.params;
    const trailer = await Trailer.findOne({ showId });
    if (!trailer) return res.status(404).json({ success: false, message: "Trailer not found" });
    res.status(200).json({ success: true, trailer });
  } catch (error) {
    next(error);
  }
};
