const router = require("express").Router();
const SallerController = require('../control/SallerController');


router.get('/add-product', SallerController.getAddProduct);
router.get('/products', SallerController.getProducts);

router.post('/add-product', SallerController.postAddProduct);

router.get('/edit-product/:productId', SallerController.getEditProduct);
router.post('/edit-product', SallerController.postEditProduct);

router.post('/delete-product', SallerController.postDeleteProduct);

module.exports = router;