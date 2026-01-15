import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
// import leadRoutes from "./src/routes/leadRoutes.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";


// Middleware
app.use(cors({ origin: ORIGIN }));
app.use(express.json());
app.use(morgan("dev"));


// Health check
// // app.get("/api/health", (req, res) => {
// //     res.json({ status: "ok", time: new Date().toISOString() });
// });


// Routes
// app.use("/api/leads", leadRoutes);


// MongoDB Connection
async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");
        // app.listen(PORT, () => console.log(`✅ API running: http://localhost:${PORT}`));
    } catch (err) {
        console.error("Mongo connection error:", err.message);
        process.exit(1);
    }
}


start();