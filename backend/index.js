const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const cors = require("cors");
const Category = require("./models/Categories");
const User = require("./models/User");
const AuthRoutes = require("./routes/Auth");
const CategoryRoutes = require("./routes/Categories");
const OrderRoutes = require("./routes/Order");

app.use(cors());
app.use(express.json());
//connecting to the database using mongoose
mongoose
  .connect(
    "mongodb+srv://admin:" +
      process.env.PASSWORD +
      "@cluster0.2wlgie0.mongodb.net/Munchify",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((x) => {
    console.log("Connected to mongo");
  })
  .catch((err) => {
    console.error(err);
  });

//passport-jwt setup
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload.identifier });
      if (user) {
        return done(null, user);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("App is running on port " + port);
});

app.use("/auth",AuthRoutes);
app.use("/Category",CategoryRoutes);
app.use("/Order",OrderRoutes);

