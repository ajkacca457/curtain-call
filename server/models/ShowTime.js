import mongoose from "mongoose";

const showTimeSchema = new mongoose.Schema(
  {
    showId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Show" },
    showDateTime: { type: Date, required: true },
    showPrice: { type: Object, default: {} },
    occupiedSeats: { type: Object, default: {} },
    temporaryHolds: {
      type: Map,
      of: new mongoose.Schema(
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          expiresAt: { type: Date }, 
        },
        { _id: false } 
      ),
      default: {},
    },
  },
  {
    minimize: false, 
  }
);

const ShowTime = mongoose.model("ShowTime", showTimeSchema);

export default ShowTime;