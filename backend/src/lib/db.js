import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED", connect.connection.host);
  } catch (error) {
    console.error("Error connection to MONGODB", error);
    process.exit(1); // 1 is fail, 0 is success
  }
};
