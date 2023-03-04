const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  role: String,
  permissions: [{ type: String }],
});

module.exports = mongoose.model("roles", roleSchema);
