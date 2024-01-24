const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const axios = require('axios');
const { getToken } = require("../helper");

router.post("/register", async (req, res) => {
    const { name, location, email, password } = req.body;
    console.log(password);
    const currentDate = new Date();
    const user = await User.findOne({ email: email });
    //if user already exist
    if (user) {
      return res
        .status(403)
        .json({ error: "User with this email already exist" });
    }
    //for new user
    const hashPassword = await bcrypt.hash(password, 10);
    const newUserData = {
      name, location, email, date : currentDate, password: hashPassword,
    };
    const newUser = await User.create(newUserData);
    const token = await getToken(email, newUser);
    const userToReturn = { ...newUser.toJSON(), token };
    console.log(userToReturn);
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
  });



  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email});
    if (!user) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }
    // console.log(password+"zahra");
    // console.log(user.password+"maryam");
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if(passwordIsValid){
    const token = await getToken(user.email, user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
    }
    else{
      return res.status(403).json({ error: "Invalid Credentials" });
    }
  });

  module.exports = router;