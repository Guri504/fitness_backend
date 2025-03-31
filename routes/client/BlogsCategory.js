const express = require("express");
const clientBlogsCategoryRouter = express.Router();
const clientBlogsCategoryController = require('../../controller/client/BlogsCategoryController');

clientBlogsCategoryRouter.get('/client/blogsCategory', clientBlogsCategoryController.index);

module.exports = clientBlogsCategoryRouter
