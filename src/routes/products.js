const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

//routes for products
router.get('/products', productController.showProducts);
router.get('/search', productController.search);
router.post('/decrease/:productId', productController.decreaseQuantity);
router.post('/increase/:productId', productController.increaseQuantity);
router.post('/addToCart/:productId', productController.addToCart);

module.exports = router;