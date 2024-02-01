const express = require("express");
const Order = require("../models/Orders");
const FoodItems = require("../models/FoodItems");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const axios = require("axios");
const { getToken } = require("../helper");
const passport = require("passport");
router.post('/placeOrder', async (req, res) => {
    try {
      const { location, email, phoneNumber, orderItems, totalPrice } = req.body;
  
      // Validate order items
      if (!Array.isArray(orderItems)) {
        return res.status(400).json({ error: 'Invalid order items. Must be an array.' });
      }
  
      // Create the order
      const newOrder = new Order({
        location,
        email,
        phoneNumber,
        orderItems,
        totalPrice,
        status: 'Pending',
      });
  
      const savedOrder = await newOrder.save();
  
      res.status(201).json(savedOrder);
      setTimeout(async () => {
        savedOrder.status = 'In Progress';
        await savedOrder.save();
      }, 60*1000);


      setTimeout(async () => {
        savedOrder.status = 'Delivered';
        await savedOrder.save();
      }, 20 * 60 * 1000);//40 minnutes

    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.post('/cancelOrder/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;

        // Find the order by ID
        const order = await Order.findById(orderId);

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if the order is already delivered
        if (order.status === 'Delivered') {
            return res.status(400).json({ error: 'Cannot cancel a delivered order' });
        }

        // Update the order status to 'Cancelled'
        order.status = 'Cancelled';
        await order.save();

        // Respond with the updated order
        res.json(order);
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


  // Endpoint for retrieving delivered orders of the current user
router.get('/delivered', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const userEmail = req.user.email; // Assuming you have authentication middleware to extract user email
    const inProgressOrders = await Order.find({ email: userEmail, status: 'Delivered' });
    res.json(inProgressOrders);
} catch (error) {
    console.error('Error retrieving in-progress orders:', error);
    res.status(500).json({ message: 'Internal server error' });
}
});

// Endpoint for retrieving in-progress orders of the current user
router.get('/in-progress', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
      const userEmail = req.user.email; // Assuming you have authentication middleware to extract user email
      const inProgressOrders = await Order.find({ email: userEmail, status: 'In Progress' });
      res.json(inProgressOrders);
  } catch (error) {
      console.error('Error retrieving in-progress orders:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


  
  

module.exports = router;
