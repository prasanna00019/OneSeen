import PostModel from "../models/PostModel.js";
import CommentModel from "../models/CommentModel.js"; 
export const CreatePost=async(req,res)=>{
 try{
  const {description , media, userId,title,interval}=req.body;
  console.log(interval,media,userId);
    const post=new PostModel({
        description,
        media,
        title,
        expiresAt:interval ,
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
export const getPostsOfAUser=async(req,res)=>{
    try{
        const userId=req.params.userId;
        const posts=await PostModel.find({user:userId});
        res.status(200).json(posts);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export const EditPost=async(req,res)=>{
    try{
      const {description ,media,title}=req.body;
      console.log(description,media,title,'server...');
      const postId=req.params.postId;
      const post =await PostModel.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
       if(post.description===description && post.media===media && post.title===title){
              return res.status(400).json({message:"No changes detected"});
       }
       else{
        post.description=description;
        post.media=media;
        post.title=title;
        post.isEdited=true;
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
        res.status(200).json({ message: "Post and its comments deleted successfully",postId : postId });
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
       export const upvotePost = async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId } = req.body; 
            const post = await PostModel.findById(postId);
            if (!post) return res.status(404).json({ message: "Post not found" });
            // If user already upvoted, remove the upvote
            if (post.upvotedUsers.includes(userId)) {
                console.log("User already upvoted");
                post.upvotedUsers = post.upvotedUsers.filter(id => id !== userId);
                if(post.upvotes>0){
                post.upvotes -= 1;
                }
            } else {
                // If user has downvoted before, remove downvote
                if (post.downvotedUsers.includes(userId)) {
                    post.downvotedUsers = post.downvotedUsers.filter(id => id !== userId);
                    if(post.downvotes>0){
                    post.downvotes -= 1;
                    }
                }
                // Add upvote
                post.upvotedUsers.push(userId);
                post.upvotes += 1;
            }
            await post.save();
            return res.json({ message: "Upvote updated", post });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };
    export const downvotePost = async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId } = req.body;
            const post = await PostModel.findById(postId);
            if (!post) return res.status(404).json({ message: "Post not found" });
            // If user already downvoted, remove the downvote
            if (post.downvotedUsers.includes(userId)) {
                console.log("User already downvoted");
                post.downvotedUsers = post.downvotedUsers.filter(id => id !== userId);
               if(post.downvotes>0){ 
                post.downvotes -= 1;
               }
            } else {
                // If user has upvoted before, remove upvote
                if (post.upvotedUsers.includes(userId)) {
                    post.upvotedUsers = post.upvotedUsers.filter(id => id !== userId);
                  if(post.upvotes>0){
                    post.upvotes -= 1;
                  }
                }
                // Add downvote
                post.downvotedUsers.push(userId);
                post.downvotes += 1;
            }
            await post.save();
            return res.json({ message: "Downvote updated", post });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };