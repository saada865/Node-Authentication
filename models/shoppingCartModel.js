const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
  itemNumber: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("ShoppingCart", shoppingCartSchema);
