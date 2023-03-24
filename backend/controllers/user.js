const Users = require('../model/user');
const Roles = require('../model/role');
const jwt = require('jsonwebtoken');

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, password } = req.body;
      const type = req.body.type || 'USER';
      const image = req.body.image;
      if (!name || !password) {
        throw { status: 400, message: 'required field cannot be empty' };
      }
      const roleData = await Roles.findOne({ role: type });
      const roles = [roleData._id];
      const userFound = await Users.findOne({ name: name, password: password });
      if (userFound) {
        throw { status: 409, message: 'User already exists' };
      }
      const newUser = await Users.create({
        name,
        password,
        type,
        image,
        roles,
      });
      res.status(201).send({ message: 'Saved' });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || 'Something went wrong!');
    }
  },
  login: async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        throw { status: 400, message: 'required field cannot be empty' };
      }
      const user = await Users.findOne({
        name: name,
        password: password,
      }).populate('roles');
      if (!user) {
        throw { status: 404, message: 'User not found' };
      }
      if (user.password === password) {
        const token = jwt.sign(
          {
            name: user.name,
            password: user.password,
            type: user.type,
            roles: user.roles,
          },
          process.env.SECRET_KEY,
          { expiresIn: '1h' }
        );
        res.status(200).send({ message: 'login success', token: token, user });
      } else {
        return res.send({ code: 404, message: 'Password Wrong' });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || 'Something went wrong');
    }
  },
  addToCart: async (req, res) => {
    try {
      const { productId, userId } = req.body;
      const isUpdate = await Users.updateOne(
        {
          _id: userId,
        },
        {
          $addToSet: { cart: productId },
        },
        {
          returnDocument: 'after',
        }
      );
      const data = await Users.findOne({ _id: userId }).populate('cart');
      res.status(200).send({ message: 'Add to cart success', isUpdate, data });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || 'Something went wrong');
    }
  },
  getCart: async (req, res) => {
    try {
      const { userId } = req.body;
      const { productId } = req.body;
      const data = await Users.findOne({ _id: userId }).populate({
        path: 'cart',
        match: { _id: productId },
      });
      res.status(200).send({ message: 'Get cart success', data: data.cart });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || 'Something went wrong');
    }
  },
  deletCart: async (req, res) => {
    try {
      const { userId } = req.body;
      const { productId } = req.body;
      console.log(userId, productId);
      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        {
          $pull: { cart: productId }, 
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
      return res.send({
        message: 'Item deleted from cart successfully',
        user: updatedUser,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || 'Something went wrong');
    }
  },
};
