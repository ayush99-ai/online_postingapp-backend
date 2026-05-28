require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// basic route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// mongo connection (FIXED PROPERLY)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});