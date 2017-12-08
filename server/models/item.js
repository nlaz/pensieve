import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    user_id: { type: String, required: true },
    deck_id: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    reviewedAt: { type: Date }, // last review timestamp
    interval: { type: Number }, // review interval (in days)
    EF: { type: Number, default: 2.5 }, // SM-2 easiness factor
    nextReviewDate: { type: Date },
    repetitions: { type: Number, default: 0 }, // number of review repetitions
  },
  { timestamps: true },
);

export default mongoose.model("Item", ItemSchema);
