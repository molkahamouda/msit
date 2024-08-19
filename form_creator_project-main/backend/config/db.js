const mongoose = require("mongoose");
const database = require("./database");

const dbURI = database.dbURI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {});
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
