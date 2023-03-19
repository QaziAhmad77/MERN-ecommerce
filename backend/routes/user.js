const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/add-to-cart', userController.addToCart);
router.post('/get-single-cart', userController.getCart);
router.post('/delete-cart', userController.deletCart);

module.exports = router;
