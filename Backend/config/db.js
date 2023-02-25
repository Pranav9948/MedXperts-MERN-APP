const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "../../.env" });

console.log("database mongoose 123")
 MONGO_URL =
   "mongodb+srv://Pranav:Pranav1!@shoplifter.k1oygu5.mongodb.net/DOCTOR";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected :  ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
