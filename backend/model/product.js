const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  category: String,
  seller: String,
  price: Number,
});

module.exports = mongoose.model("products", productSchema);
