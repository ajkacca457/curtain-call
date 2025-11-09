import mongoose from "mongoose";

const trailerSchema = new mongoose.Schema({
  showId: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  videoUrl: { type: String, required: true },
  releaseDate: { type: Date },
}, { timestamps: true });

const Trailer = mongoose.model("Trailer", trailerSchema);

export default Trailer;
