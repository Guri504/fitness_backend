const express = require("express");
const clientBlogsRouter = express.Router();
const clientBlogsController = require("../../controller/client/BlogsController");

clientBlogsRouter.get('/client/blogs', clientBlogsController.index);
clientBlogsRouter.get('/client/blog/view/:id', clientBlogsController.detail)

module.exports = clientBlogsRouter;