const {sequelize} = require("../models/index");

exports.getAddProduct = (req, res) => {
    res.render('saller/add-product', {
        pageTitle: 'Add Product',
        path: '/saller/add-product',
        editing: false
    });
};

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if (editMode && editMode !== 'true') {
        return res.redirect('/');
    }
    const productId = req.params.productId;
    req.user.getProducts({
            where: {
                id: productId
            }
        })
        .then((products) => {
            const product = products[0];
            if (!product) {
                return res.redirect('/');
            }
            res.render('saller/edit-product', {
                pageTitle: 'Edit Product',
                path: '/saller/edit-product',
                editing: editMode === undefined || editMode === 'true',
                product: product
            });
        })
        .catch(err => console.error(err));
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        })
        .then(result => {
            res.redirect('/saller/products');
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res) => {
    const id = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.findByPk(id)
        .then(product => {
            product.title = title;
            product.imageUrl = imageUrl;
            product.price = price;
            product.description = description;
            return product.save();
        })
        .then(result => res.redirect('/saller/products'))
        .catch(err => console.error(err));
};

exports.getProducts = (req, res) => {
    req.user.getProducts()
        .then((products) => {
            res.render('saller/products', {
                prods: products,
                pageTitle: 'Saller Products',
                path: '/saller/products'
            });
        })
        .catch(err => console.error(err));
};

exports.postDeleteProduct = (req, res) => {
    const productId = req.body.productId;
    Product.destroy({
            where: {
                id: productId
            }
        })
        .then(() => res.redirect('/saller/products'))
        .catch(err => console.error(err));
};