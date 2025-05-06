const express = require('express');
const adminProductsSizeRouter = express.Router();
const adminProductsSizeController = require('../../controller/admin/Products_Sizes_Controller');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminProductsSizeRouter.get('/admin/products-sizes', adminVerifyToken, adminProductsSizeController.index);
adminProductsSizeRouter.post('/admin/product-size/add', adminVerifyToken, adminProductsSizeController.add);
adminProductsSizeRouter.put('/admin/product-size/edit/:id', adminVerifyToken, adminProductsSizeController.update);
adminProductsSizeRouter.put('/admin/product-size/delete/:id', adminVerifyToken, adminProductsSizeController.deleteRow);
adminProductsSizeRouter.get('/admin/product-size/view/:id', adminVerifyToken, adminProductsSizeController.detail);

module.exports = adminProductsSizeRouter; 