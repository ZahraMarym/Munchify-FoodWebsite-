const mongoose = require('mongoose')

const { Schema } = mongoose;

const FootItemsSchema = new Schema({
    categoryName: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      options: [
        {
          small: {
            type: Number,
            required: true,
          },
          medium: {
            type: Number,
            required: true,
          },
          large: {
            type: Number,
            required: true,
          },
        }
      ],
      description: {
        type: String,
        required: true,
      },


  });

  module.exports = mongoose.model('FoodItems',FootItemsSchema)