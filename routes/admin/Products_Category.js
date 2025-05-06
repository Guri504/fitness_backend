const express = require('express');
const adminProductsCategoryRouter = express.Router();
const adminProductsCategoryController = require('../../controller/admin/Products_Category_Controller');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminProductsCategoryRouter.get('/admin/products-category', adminVerifyToken, adminProductsCategoryController.index);
adminProductsCategoryRouter.post('/admin/products-category/add', adminVerifyToken, adminProductsCategoryController.add);
adminProductsCategoryRouter.put('/admin/products-category/edit/:id', adminVerifyToken, adminProductsCategoryController.update);
adminProductsCategoryRouter.delete('/admin/products-category/delete/:id', adminVerifyToken, adminProductsCategoryController.deleteRow);
adminProductsCategoryRouter.get('/admin/products-category/view/:id', adminVerifyToken, adminProductsCategoryController.detail);

module.exports = adminProductsCategoryRouter; 