import express from 'express';
import mongoose from 'mongoose';
const CommentSchema=new mongoose.Schema({
    _id:{ type: mongoose.Schema.Types.ObjectId, required: true ,auto: true},
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: String, required: true ,default: "Anonymous"},
    comment: { type: String, required: true },
    upvotes: { type: Number, required: true, default: 0 },
    downvotes: { type: Number, required: true, default: 0 },
    isEdited: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model("Comment", CommentSchema);