const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const { createClient } = require("redis");
// importing routes
const userRoutes = require("./routes/userRoutes.js");
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODENV = process.env.NODE_ENV;

// intialize the express server
const app = express();

// database connection
connectDB();

// redis connection
const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.log("Missing Redis URL");
  process.exit(1);
}

const redisClient = createClient({
  url: redisUrl,
});

redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => console.log(err));

//middlewares
// req body parser
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ limit: "20kb", extended: true }));

//using routes
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} in ${NODENV} environment`);
});

module.exports = {redisClient}