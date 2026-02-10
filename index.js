const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
// importing routes
const userRoutes = require("./routes/userRoutes.js");
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODENV = process.env.NODE_ENV;

// intialize the express server
const app = express();

// database connection
connectDB();

//middlewares

// req body parser
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ limit: "20kb", extended: true }));

//using routes
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} in ${NODENV} environment`);
});
