import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" ,default:[]}],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "SecretMessage",default:[]}],
}, { timestamps: true });
export default mongoose.model("User", userSchema);