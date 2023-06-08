import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  otp: String,
  email: String,
});

export default mongoose.models.Password ||
  mongoose.model("Password", userSchema);
