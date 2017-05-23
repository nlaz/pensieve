import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Tag', TagSchema);
