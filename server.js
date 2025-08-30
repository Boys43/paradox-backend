import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use PORT from environment (Passenger provides it)
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
const MONGO_URI = "mongodb+srv://testadmin:testadmin123@cluster0.mbcb17h.mongodb.net/test/hello?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// Simple User model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => res.send("🚀 Backend is running!"));

app.post("/users", async (req, res) => {
  try {
    const savedUser = await new User(req.body).save();
    res.status(201).json({ success: true, data: savedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));