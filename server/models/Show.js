import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    genres: {
      type: Array,
      required: true,
    },
    casts: {
      type: Array,
      required: true,
    },
    release_date: {
      type: Date,
      required: true,
    },
    original_language: {
      type: String,
      required: true,
      enum: ['en'], // You can expand this to other ISO language codes
    },
    tagline: {
      type: String,
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    vote_count: {
      type: Number,
      required: true,
      min: 0,
    },
    runtime: {
      type: Number,
      required: true,
      min: 1, // runtime in minutes
    },
  },
  {
    timestamps: true,
  }
);


const Show = mongoose.model("Show",showSchema);

export default Show;