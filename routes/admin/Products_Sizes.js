const express = require('express');
const adminProductsSizeRouter = express.Router();
const adminProductsSizeController = require('../../controller/admin/Products_Sizes_Controller');

adminProductsSizeRouter.get('/admin/products-sizes', adminProductsSizeController.index);
adminProductsSizeRouter.post('/admin/product-size/add', adminProductsSizeController.add);
adminProductsSizeRouter.put('/admin/product-size/edit/:id', adminProductsSizeController.update);
adminProductsSizeRouter.delete('/admin/product-size/delete/:id', adminProductsSizeController.deleteRow);
adminProductsSizeRouter.get('/admin/product-size/view/:id', adminProductsSizeController.detail);

module.exports = adminProductsSizeRouter; 