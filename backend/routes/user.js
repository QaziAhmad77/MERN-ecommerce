const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/add-to-cart", userController.addToCart);
router.post("/get-user-cart", userController.getCart);

module.exports = router;
