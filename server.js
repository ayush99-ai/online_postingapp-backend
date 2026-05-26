const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mongooseReferenceDB")
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("Database Connection Error");
    console.log(error);
  });

// routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// home route
app.get("/", (req, res) => {
  res.send("Express Server Running");
});

// server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});