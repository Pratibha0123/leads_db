import express from "express";
import cors from "cors";
import morgan from "morgan";
import leadRoutes from "./routes/leadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*"
    })
);

app.get("/", (req, res) => res.json({ ok: true }));

app.use("/api/leads", leadRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;