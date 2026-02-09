import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// importing routes
import userRoutes from './routes/userRoutes.js'


dotenv.config();
await connectDB();

const app = express();

//using routes
app.use("/api/v1", userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
