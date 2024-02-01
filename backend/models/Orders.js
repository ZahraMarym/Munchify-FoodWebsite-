const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  orderItems: [
    { type: Object,
        required: true,
     }
    ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Delivered","Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now  // Set the default value to the current date and time
  }
});

module.exports = mongoose.model("Order", OrderSchema);
