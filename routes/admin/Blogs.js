const express = require("express");
const adminBlogsRouter = express.Router();
const adminBlogsController = require("../../controller/admin/BlogsController");
const { adminVerifyToken } = require("../../middleware/authmiddleware");

adminBlogsRouter.get('/admin/blogs', adminVerifyToken, adminBlogsController.indexOfAdmin);
adminBlogsRouter.post('/admin/blog/add', adminVerifyToken, adminBlogsController.add);
adminBlogsRouter.put('/admin/blog/edit/:id', adminVerifyToken, adminBlogsController.update);
adminBlogsRouter.get('/admin/blog/view/:id', adminVerifyToken, adminBlogsController.detail);
adminBlogsRouter.put('/admin/blog/delete/:id', adminVerifyToken, adminBlogsController.deleteRow);




module.exports = adminBlogsRouter;