import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DeckSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user_id: { type: String }, // deprecated
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Deck", DeckSchema);
