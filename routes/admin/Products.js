const express = require('express');
const adminProductsRouter = express.Router();
const adminProductsController = require('../../controller/admin/Products_Controller');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminProductsRouter.get('/admin/products', adminVerifyToken, adminProductsController.index);
adminProductsRouter.post('/admin/product/add', adminVerifyToken, adminProductsController.add);
adminProductsRouter.put('/admin/product/edit/:id', adminVerifyToken, adminProductsController.update);
adminProductsRouter.put('/admin/product/delete/:id', adminVerifyToken, adminProductsController.deleteRow);
adminProductsRouter.get('/admin/product/view/:id', adminVerifyToken, adminProductsController.detail);
adminProductsRouter.get('/admin/less-stock-products', adminVerifyToken, adminProductsController.getLessQuantityProductVariant);

module.exports = adminProductsRouter; 