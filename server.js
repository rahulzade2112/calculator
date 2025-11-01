import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: Number,
  message: String,
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

app.post("/api/feedback", async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;
    if (!name || !email || !rating || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }
    await Feedback.create({ name, email, rating, message });
    res.json({ message: "Thank you for your feedback!" });
  } catch (err) {
    console.error("❌ Error saving feedback:", err);
    res.status(500).json({ message: "Server error while saving feedback." });
  }
});

app.listen(5001, () => console.log("✅ Server running on port 5001"));
