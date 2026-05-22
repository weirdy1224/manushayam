const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/manushayam';
  
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    console.log("Ensure MongoDB Compass is installed and MongoDB is running locally at 'mongodb://127.0.0.1:27017'");
    process.exit(1);
  }
};

module.exports = connectDB;
