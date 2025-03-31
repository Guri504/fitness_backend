const express = require("express");
const adminBlogsCategoryRouter = express.Router();
const adminBlogsCategoryController = require('../../controller/admin/BlogsCategoryController')

adminBlogsCategoryRouter.get('/admin/blogsCategory', adminBlogsCategoryController.index);
adminBlogsCategoryRouter.post('/admin/blogsCategory/add', adminBlogsCategoryController.add);
adminBlogsCategoryRouter.get('/admin/blogsCategory/view/:id', adminBlogsCategoryController.detail);
adminBlogsCategoryRouter.put('/admin/blogsCategory/edit/:id', adminBlogsCategoryController.update);
adminBlogsCategoryRouter.delete('/admin/blogsCategory/delete/:id', adminBlogsCategoryController.deleteRow);

module.exports = adminBlogsCategoryRouter