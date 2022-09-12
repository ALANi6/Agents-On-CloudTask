const router = require("express").Router();
const ShopController = require('../control/ShopController');


router.get('/', ShopController.getIndex);
router.get('/products', ShopController.getProducts);
router.get('/cart', ShopController.getCart);
router.post('/cart', ShopController.postCart);
router.get('/checkout', ShopController.getCheckout);
router.get('/orders', ShopController.getOrders);
router.get('/products/:productId', ShopController.getProduct);
router.post('/cart-delete-item', ShopController.postCartDeleteProduct);
router.post('/create-order', ShopController.postOrder);

module.exports = router;