const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

router.get("/get-products", productController.getProducts);
router.post("/add-product", productController.addProduct);
router.put("/edit-product", productController.editProduct);
router.get("/get-product/:id", productController.getSingleProduct);
router.post("/delete-products", productController.deleteProducts);
router.delete("/delete-all", productController.deleteAllProducts);

module.exports = router;
