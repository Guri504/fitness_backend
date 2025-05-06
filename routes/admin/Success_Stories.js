const express = require("express");
const adminSuccessStoriesRouter = express.Router();
const adminSuccessStoriesController = require("../../controller/admin/Success_Stories_Controller");
const { adminVerifyToken } = require("../../middleware/authmiddleware");

adminSuccessStoriesRouter.get('/admin/success_stories', adminVerifyToken, adminSuccessStoriesController.indexOfAdmin);
adminSuccessStoriesRouter.post('/admin/success_stories/add', adminVerifyToken, adminSuccessStoriesController.add);
adminSuccessStoriesRouter.put('/admin/success_stories/edit/:id', adminVerifyToken, adminSuccessStoriesController.update);
adminSuccessStoriesRouter.get('/admin/success_stories/view/:id', adminVerifyToken, adminSuccessStoriesController.detail);
adminSuccessStoriesRouter.delete('/admin/success_stories/delete/:id', adminVerifyToken, adminSuccessStoriesController.deleteRow);

module.exports = adminSuccessStoriesRouter;