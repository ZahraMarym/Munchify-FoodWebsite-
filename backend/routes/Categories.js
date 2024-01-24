const express = require('express');
const Category = require('../models/Categories');
const FoodItems = require('../models/FoodItems');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const axios = require('axios');
const { getToken } = require("../helper");
const passport = require("passport");
router.get(

  // all categories
    "/getCategory",
    async (req, res) => {
      try {
        // Find all songs
        const Categories = await Category.find({});
  
        return res.status(200).json({ data: Categories });
      } catch (error) {
        console.error("Error fetching all categories:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );


  //get all food items
  router.get(
    "/getFoodItems",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        // Find all songs
        const Fooditems = await FoodItems.find({});
  
        return res.status(200).json({ data: Fooditems });
      } catch (error) {
        console.error("Error fetching all categories:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

  //get food items of specific category
  router.get(
    "/getFoodItems/:category",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const category = req.params.category;
  
        // Find food items based on the specified category
        const foodItems = await FoodItems.find({ categoryName: category });
  
        if (!foodItems || foodItems.length === 0) {
          return res.status(404).json({ error: "No food items found for the specified category" });
        }
  
        return res.status(200).json({ data: foodItems });
      } catch (error) {
        console.error("Error fetching food items by category:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );
  
  
  
  
  module.exports = router;