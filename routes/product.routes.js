const express = require('express');
const productController = require('../controllers/products.controller');

const router = express.Router();


router.post('/register', productController.register);
router.get('/', productController.products);
router.get('/:id', productController.productById);




module.exports = router;