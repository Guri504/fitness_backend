const express = require('express');
const adminRouter = express.Router();
const adminController = require('../../controller/admin/Login_Controller');

adminRouter.post('/admin/login', adminController.login);
adminRouter.post('/admin/forgot-password', adminController.forgotPassword);
adminRouter.post('/admin/reset-password/:tokenFromLink', adminController.resetPassword);

module.exports = adminRouter;