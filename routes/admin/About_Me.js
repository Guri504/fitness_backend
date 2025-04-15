const express = require("express");
const adminAboutMeRouter = express.Router();
const adminAboutMeController = require("../../controller/admin/About_Me_Controller");

adminAboutMeRouter.get('/admin/about_me_winner', adminAboutMeController.indexOfAdmin);
adminAboutMeRouter.post('/admin/about_me_winner/add', adminAboutMeController.add);
adminAboutMeRouter.put('/admin/about_me_winner/edit/:id', adminAboutMeController.update);
adminAboutMeRouter.get('/admin/about_me_winner/view/:id', adminAboutMeController.detail);
adminAboutMeRouter.delete('/admin/about_me_winner/delete/:id', adminAboutMeController.deleteRow);

module.exports = adminAboutMeRouter;