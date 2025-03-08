import PostModel from "../models/PostModel.js";
import cron from "node-cron";

// Function to delete expired posts
export const checkForPostExpiration = async () => {
  try {
    const posts = await PostModel.find();
    const now = Date.now();
 
    posts.forEach(async (post) => {
      if (post.createdAt.getTime() + 10 * 60 * 1000 < now) { // 10 minutes expiration
        await PostModel.findByIdAndDelete(post._id);
        console.log(`Deleted expired post: ${post._id}`);
      }
    });
  } catch (err) {
    console.error("Error checking post expiration:", err);
  }
};

// Schedule the job to run every 1 minute
// cron.schedule("*/1 * * * *", () => {
//   console.log("Running post expiration check...");
//   checkForPostExpiration();
// });

// console.log("Cron job for post expiration is running every 1 minute.");

export const checkForMessageExpiration=async()=>{

}