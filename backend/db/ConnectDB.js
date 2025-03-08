import mongoose from "mongoose";
/**
 * Establishes a connection to the MongoDB database
 * 
 * This function attempts to connect to the MongoDB database using the connection
 * string provided in the MONGO_URI environment variable. If the connection is
 * successful, it logs a success message to the console. If the connection fails,
 * it logs an error message to the console.
 * 
 * @function connectDB
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo DB successfuly");
  } catch (error) {
    console.log("error conencting")
  }
}
export default connectDB  