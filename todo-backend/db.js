const mongoose = require('mongoose');
const logger = require('./utils/logger');
const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_URI}`);
    logger.info("Mongo DB connected")
  } catch (error) {
    logger.error("Mongodb connection failed", error.message)
  }
};

module.exports = connectDB