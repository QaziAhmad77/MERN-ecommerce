const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const productController = require('../controllers/product');
const authController = require('../middleware/auth');

router.get('/get-products', authController.auth, productController.getProducts);
router.post(
  '/add-product',
  authController.auth,
  upload.single('image'),
  productController.addProduct
);
router.put('/edit-product', authController.auth, productController.editProduct);
router.get(
  '/get-product/:id',
  authController.auth,
  productController.getSingleProduct
);
router.post(
  '/delete-products',
  authController.auth,
  productController.deleteProducts
);
router.delete('/delete-all', productController.deleteAllProducts);

module.exports = router;
