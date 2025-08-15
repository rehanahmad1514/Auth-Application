const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
// This function connects to the MongoDB database using Mongoose
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
        // Options to avoid deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
};
module.exports = dbConnect;
