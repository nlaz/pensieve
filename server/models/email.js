import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EmailSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user_id: { type: String }, // deprecated
    session_id: { type: String },
    opened: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Email", EmailSchema);
