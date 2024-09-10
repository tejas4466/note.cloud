import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for CORS
app.use(
  cors({
    origin: "https://note-cloud-frontend-alpha.vercel.app/", // Ensure this matches your frontend URL
    methods: "GET,POST,PUT,DELETE", // Allow all necessary HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Placeholder route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
