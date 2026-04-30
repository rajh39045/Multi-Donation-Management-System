import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import { protect } from "./middleware/authMiddleware.js";
import donationRoutes from "./routes/donationRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/requests", requestRoutes);

app.get("/api/test", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

