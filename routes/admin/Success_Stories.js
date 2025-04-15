const express = require("express");
const adminSuccessStoriesRouter = express.Router();
const adminSuccessStoriesController = require("../../controller/admin/Success_Stories_Controller");

adminSuccessStoriesRouter.get('/admin/success_stories', adminSuccessStoriesController.indexOfAdmin);
adminSuccessStoriesRouter.post('/admin/success_stories/add', adminSuccessStoriesController.add);
adminSuccessStoriesRouter.put('/admin/success_stories/edit/:id', adminSuccessStoriesController.update);
adminSuccessStoriesRouter.get('/admin/success_stories/view/:id', adminSuccessStoriesController.detail);
adminSuccessStoriesRouter.delete('/admin/success_stories/delete/:id', adminSuccessStoriesController.deleteRow);

module.exports = adminSuccessStoriesRouter;