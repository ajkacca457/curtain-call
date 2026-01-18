import mongoose from "mongoose";

const showTimeSchema = new mongoose.Schema(
  {
    showId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Show",
    },

    showDateTime: {
      type: Date,
      required: true,
    },

    showPrice: {
      type: Number,
      required: true,
    },

    occupiedSeats: {
      type: Object,
      default: {},
    },

    temporaryHolds: {
      type: Object,
      default: {},
    },
  },
  {
    minimize: false,
  }
);

const ShowTime = mongoose.model("ShowTime", showTimeSchema);
export default ShowTime;
