const express = require("express");
const adminBlogsRouter = express.Router();
const adminBlogsController = require("../../controller/admin/BlogsController");

adminBlogsRouter.get('/admin/blogs', adminBlogsController.indexOfAdmin);
adminBlogsRouter.post('/admin/blog/add', adminBlogsController.add);
adminBlogsRouter.put('/admin/blog/edit/:id', adminBlogsController.update);
adminBlogsRouter.get('/admin/blog/view/:id', adminBlogsController.detail);
adminBlogsRouter.delete('/admin/blog/delete/:id', adminBlogsController.deleteRow);




module.exports = adminBlogsRouter;