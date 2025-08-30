const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(morgan("dev")); // logs requests

// Routes
app.use("/students", studentRoutes);

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log("✅ Server running on http://localhost:5000")))
  .catch(err => console.log(err));
