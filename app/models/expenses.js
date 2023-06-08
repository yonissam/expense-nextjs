import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  expense: String,
  date: String,
  category: String,
  amount: Number,
  password: String,
});

export default mongoose.models.Expense || mongoose.model("Expense", userSchema);
