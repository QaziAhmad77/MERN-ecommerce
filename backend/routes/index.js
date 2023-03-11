const express = require('express');
const router = express.Router();

const productRouter = require("./product");
const userRouter = require("./user");
const roleRouter = require("./role");

router.use("/products",productRouter);
router.use("/users",userRouter)
router.use("/roles",roleRouter)

module.exports = router;
