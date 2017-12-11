import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    value: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Review", ReviewSchema);
