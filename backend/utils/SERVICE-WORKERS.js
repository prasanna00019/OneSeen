import MessageModel from "../models/MessageModel.js";
import PostModel from "../models/PostModel.js";
import cron from "node-cron";
import { io } from "../socket/socket.js";

// Function to delete expired posts
export const checkForPostExpiration = async () => {
  try {
    const posts = await PostModel.find();
    const now = Date.now();
 
    posts.forEach(async (post) => {
      console.log(post.createdAt.getTime() + post.expiresAt*1000);
      if (post.createdAt.getTime() + post.expiresAt*1000 < now) { 
        await PostModel.findByIdAndDelete(post._id);
        console.log(`Deleted expired post: ${post._id}`);
        const postId=post._id;
        io.emit("disappearPost", postId);
      }
    });
  } catch (err) {
    console.error("Error checking post expiration:", err);
  }
};
export const CheckForMessageExpiration = async () => {
     try{
      const Messages=await MessageModel.find();
      const now=Date.now();
      Messages.forEach(async(message)=>{
        if(message.createdAt.getTime() + 24*60*60*1000<now){
          await MessageModel.findByIdAndDelete(message._id);
          console.log(`Deleted expired message: ${message._id}`);
        }
      });
     }
     catch(err){
      console.log(err);
     }
}
// Schedule the job to run every 1 minute
cron.schedule("*/1 * * * *", () => {
  console.log("Running post expiration check...");
  checkForPostExpiration();
});
cron.schedule("0 0 * * *", () => {
  console.log("Running message expiration check...");
  CheckForMessageExpiration();
});
console.log("Cron job for post expiration is running every 1 minute.");
console.log("Cron job for message expiration is running every day.");
export const checkForMessageExpiration=async()=>{

}