const express = require('express');
const adminProductsCategoryRouter = express.Router();
const adminProductsCategoryController = require('../../controller/admin/Products_Category_Controller');

adminProductsCategoryRouter.get('/admin/products-category', adminProductsCategoryController.index);
adminProductsCategoryRouter.post('/admin/products-category/add', adminProductsCategoryController.add);
adminProductsCategoryRouter.put('/admin/products-category/edit/:id', adminProductsCategoryController.update);
adminProductsCategoryRouter.delete('/admin/products-category/delete/:id', adminProductsCategoryController.deleteRow);
adminProductsCategoryRouter.get('/admin/products-category/view/:id', adminProductsCategoryController.detail);

module.exports = adminProductsCategoryRouter; 