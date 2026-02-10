import express from "express";
import dotenv from "dotenv";
import pkg from "express-mongo-sanitize";
import connectDB from "./config/db.js";
const mongoSanitize = pkg;

// importing routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODENV = process.env.NODE_ENV;

// intialize the express server
const app = express();

// database connection
await connectDB();

//middlewares

// req body parser
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ limit: "20kb", extended: true }));
app.use(mongoSanitize());

//using routes
app.use("/api/v1", userRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} in ${NODENV} environment`);
});
