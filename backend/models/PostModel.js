import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    description: { type: String, required: true },
    media: { type: String, required: false, default: "" },
    upvotes: { type: Number, required: true, default: 0 },
    downvotes: { type: Number, required: true, default: 0 },
    user: { type: String, required: true, default: "Anonymous" },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] },
    ],
    isEdited: { type: Boolean, default: false },
    expiresAt: { type: Number, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Post", PostSchema);
