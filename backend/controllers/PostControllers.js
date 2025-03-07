import PostModel from "../models/PostModel.js";
import CommentModel from "../models/CommentModel.js"; 
export const CreatePost=async(req,res)=>{
 try{
  const {description , media, userId}=req.body;
    const post=new PostModel({
        description,
        media,
        user:userId ? userId : "Anonymous"
    });
    const createdPost=await post.save();
    res.status(201).json(createdPost);
 }
 catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error"});
 }
}
export const EditPost=async(req,res)=>{
    try{
      const {description ,media}=req.body;
      const postId=req.params.postId;
      const post =await PostModel.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
       if(post.description===description && post.media===media){
              return res.status(400).json({message:"No changes detected"});
       }
       else{
        post.description=description;
        post.media=media;
        const updatedPost=await post.save();
        res.status(200).json(updatedPost);
       }
    }
    catch(err){
       console.log(err);
       res.status(500).json({message:"Internal Server Error"});
    }
   }

export const DeletePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        // Check if the post exists
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Run both delete operations in parallel
        await Promise.all([
            CommentModel.deleteMany({ post: postId }),  // Delete comments
            PostModel.findByIdAndDelete(postId)         // Delete post
        ]);

        res.status(200).json({ message: "Post and its comments deleted successfully" });
    } catch (err) {
        console.error("Error deleting post and comments:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

    export const getAllPosts=async(req,res)=>{
        try{
            const posts=await PostModel.find();
            res.status(200).json(posts);
        }
        catch(err){
            console.log(err);
            res.status(500).json({message:"Internal Server Error"});
        }
       }
    export const GetPostById=async(req,res)=>{
        try{
            const postId=req.params.postId;
            const post =await PostModel.findById(postId);
            if(!post){
                return res.status(404).json({message:"Post not found"});
            }
            res.status(200).json(post);
        }
        catch(err){
            console.log(err);
            res.status(500).json({message:"Internal Server Error"});
        }
       }