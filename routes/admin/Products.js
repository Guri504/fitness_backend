const express = require('express');
const adminProductsRouter = express.Router();
const adminProductsController = require('../../controller/admin/Products_Controller');

adminProductsRouter.get('/admin/products', adminProductsController.index);
adminProductsRouter.post('/admin/product/add', adminProductsController.add);
adminProductsRouter.put('/admin/product/edit/:id', adminProductsController.update);
adminProductsRouter.delete('/admin/product/delete/:id', adminProductsController.deleteRow);
adminProductsRouter.get('/admin/product/view/:id', adminProductsController.detail);

module.exports = adminProductsRouter; 