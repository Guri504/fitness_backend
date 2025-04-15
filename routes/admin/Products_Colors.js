const express = require('express');
const adminProductsColorRouter = express.Router();
const adminProductsColorController = require('../../controller/admin/Products_Colors_Controller');

adminProductsColorRouter.get('/admin/products-colors', adminProductsColorController.index);
adminProductsColorRouter.post('/admin/product-color/add', adminProductsColorController.add);
adminProductsColorRouter.put('/admin/product-color/edit/:id', adminProductsColorController.update);
adminProductsColorRouter.delete('/admin/product-color/delete/:id', adminProductsColorController.deleteRow);
adminProductsColorRouter.get('/admin/product-color/view/:id', adminProductsColorController.detail);

module.exports = adminProductsColorRouter; 