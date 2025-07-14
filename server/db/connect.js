import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log("Attempting to connecting to db...");
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connect to db successfully...");
  } catch (error) {
    console.log("Failed connect to db", error.message);
    process.exit(1);
  }
};

export default connect;
