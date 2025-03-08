import mongoose from "mongoose";
const secretMessageSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto
    : true},
    message: { type: String, required: true },
    sender: { type: String, required: true ,default: "Anonymous"},
    recipient: { type: String, required: true ,default: "Anonymous"}, 
    expiresAt: { type: Date, required: true }, 
    isRead: { type: Boolean, default: false }, 
    isEdited: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model("SecretMessage", secretMessageSchema);
