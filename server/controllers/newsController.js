import News from "../models/News.js";
import ErrorResponse from "../utils/ErrorHandle.js"

// Get all active news
export const getAllNews = async (req, res, next) => {
  try {
    const newsList = await News.find({ isActive: true }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      total: newsList.length,
      news: newsList,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new announcement (admin only)
export const createNews = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description) {
      return next(new ErrorResponse("Title and description are required", 400));
    }

    const news = await News.create({ title, description, image });
    res.status(201).json({
      success: true,
      message: "News created successfully",
      news,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a news item (admin only)
export const deleteNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return next(new ErrorResponse("News not found", 404));
    }

    await news.deleteOne();
    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
