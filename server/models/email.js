import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmailSchema = new Schema(
  {
    user_id: { type: String, required: true },
    session_id: { type: String },
    opened: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Email', EmailSchema);
