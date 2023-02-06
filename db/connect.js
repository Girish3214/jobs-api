import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("useCreateIndex", true);
  try {
    const URL = process.env.MONGO_URL;
    const conn = await mongoose.connect(URL, {
      dbName: "JOBS_API",
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB", conn.connection.host);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
