const express = require('express');
const adminProductsColorRouter = express.Router();
const adminProductsColorController = require('../../controller/admin/Products_Colors_Controller');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminProductsColorRouter.get('/admin/products-colors', adminVerifyToken, adminProductsColorController.index);
adminProductsColorRouter.post('/admin/product-color/add', adminVerifyToken, adminProductsColorController.add);
adminProductsColorRouter.put('/admin/product-color/edit/:id', adminVerifyToken, adminProductsColorController.update);
adminProductsColorRouter.put('/admin/product-color/delete/:id', adminVerifyToken, adminProductsColorController.deleteRow);
adminProductsColorRouter.get('/admin/product-color/view/:id', adminVerifyToken, adminProductsColorController.detail);

module.exports = adminProductsColorRouter; 