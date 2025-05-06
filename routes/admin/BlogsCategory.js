const express = require("express");
const adminBlogsCategoryRouter = express.Router();
const adminBlogsCategoryController = require('../../controller/admin/BlogsCategoryController');
const { adminVerifyToken } = require("../../middleware/authmiddleware");

adminBlogsCategoryRouter.get('/admin/blogsCategory', adminVerifyToken, adminBlogsCategoryController.index);
adminBlogsCategoryRouter.post('/admin/blogsCategory/add', adminVerifyToken, adminBlogsCategoryController.add);
adminBlogsCategoryRouter.get('/admin/blogsCategory/view/:id', adminVerifyToken, adminBlogsCategoryController.detail);
adminBlogsCategoryRouter.put('/admin/blogsCategory/edit/:id', adminVerifyToken, adminBlogsCategoryController.update);
adminBlogsCategoryRouter.put('/admin/blogsCategory/delete/:id', adminVerifyToken, adminBlogsCategoryController.deleteRow);

module.exports = adminBlogsCategoryRouter