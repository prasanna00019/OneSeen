import CommentModel from "../models/CommentModel.js";
import PostModel from "../models/PostModel.js";

export const AddComment = async (req, res) => {
  try{
   const { userId, comment}=req.body;
   const {postId}=req.params;
   const post=await PostModel.findById(postId);
   if(!post){
     return res.status(404).json({message:"Post not found"});
   }
   const newComment=new CommentModel({
        post:postId,
        user:userId,
        comment
   });
   post.comments.push(newComment._id);
   await post.save();
   const createdComment=await newComment.save();
   res.status(201).json(createdComment);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error"});
  }
}
export const DeleteComment = async (req, res) => {
 try{
   const {commentId,postId}=req.params;
   const post=await PostModel.findById(postId);
    if(!post){
      return res.status(404).json({message:"Post not found"});
    }
    const comment =await CommentModel.findById(commentId);
    if(!comment){
        return res.status(404).json({message:"Comment not found"});
    }
    post.comments.pull(commentId);
    await post.save();
    await CommentModel.findByIdAndDelete(commentId);
    res.status(200).json({message:"Comment deleted successfully"});
 }
 catch(err){
   console.log(err);
   res.status(500).json({message:"Internal Server Error"});
 }
}
export const getAllCommentsOfAPost = async (req, res) => {
    try{
        const {postId}=req.params;
        const post=await PostModel.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        const comments=await CommentModel.find({
            post:postId
        });
        res.status(200).json(comments);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export const EditCommentById = async (req, res) => {
    try{
      const {comment}=req.body;
      const commentId=req.params.commentId;
      const postId=req.params.postId;
      const post=await PostModel.findById(postId); 
      if(!post){
          return res.status(404).json({message:"Post not found"});
      }
      const commentToEdit=await CommentModel.findById(commentId);
      if(!commentToEdit){
          return res.status(404).json({message:"Comment not found"});
      }
      if(commentToEdit.comment===comment){
          return res.status(400).json({message:"No changes detected"});
      }
      else{
          commentToEdit.comment=comment;
          const updatedComment=await commentToEdit.save();
          res.status(200).json(updatedComment);
      }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}