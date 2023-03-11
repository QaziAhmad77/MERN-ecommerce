const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  password: { type: String },
  type: String,
  cart: [{ type: Schema.Types.ObjectId, ref: 'products' }],
  roles: [{ type: String, ref: 'roles' }],
});

module.exports = mongoose.model('users', userSchema);
