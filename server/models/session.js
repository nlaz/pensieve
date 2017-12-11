import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user_id: { type: String }, // deprecated
    items: { type: Array, required: true },
    type: { type: String },
    finishedAt: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("ReviewSession", SessionSchema);
