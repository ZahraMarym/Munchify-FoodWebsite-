const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
require("dotenv").config();




app.use(express.json());
//connecting to the database using mongoose
mongoose
  .connect(
    "mongodb+srv://admin:" +
      process.env.PASSWORD +
      "@cluster0.2wlgie0.mongodb.net/FoodWebsite",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((x) => {
    console.log("Connected to mongo");
  })
  .catch((err) => {
    console.error(err);
  });
app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.listen(port, () => {
    console.log("App is running on port " + port);
  });