const express = require("express");
const adminAboutMeRouter = express.Router();
const adminAboutMeController = require("../../controller/admin/About_Me_Controller");
const { adminVerifyToken } = require("../../middleware/authmiddleware");

adminAboutMeRouter.get('/admin/about_me_winner', adminVerifyToken, adminAboutMeController.indexOfAdmin);
adminAboutMeRouter.post('/admin/about_me_winner/add', adminVerifyToken, adminAboutMeController.add);
adminAboutMeRouter.put('/admin/about_me_winner/edit/:id', adminVerifyToken, adminAboutMeController.update);
adminAboutMeRouter.get('/admin/about_me_winner/view/:id', adminVerifyToken, adminAboutMeController.detail);
adminAboutMeRouter.put('/admin/about_me_winner/delete/:id', adminVerifyToken, adminAboutMeController.deleteRow);

module.exports = adminAboutMeRouter;