import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
