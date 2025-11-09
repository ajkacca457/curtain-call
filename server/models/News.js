import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the announcement"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String, // optional: URL for a thumbnail or banner
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);
export default News;
