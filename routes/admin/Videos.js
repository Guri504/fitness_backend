const express = require('express');
const adminVideoRouter = express.Router();
const adminVideoController = require('../../controller/admin/Videos_Controller');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminVideoRouter.get('/admin/videos', adminVerifyToken, adminVideoController.index);
adminVideoRouter.post('/admin/video/add', adminVerifyToken, adminVideoController.add);
adminVideoRouter.put('/admin/video/edit/:id', adminVerifyToken, adminVideoController.update);
adminVideoRouter.get('/admin/video/view/:id', adminVerifyToken, adminVideoController.view);
adminVideoRouter.put('/admin/video/soft-delete/:id', adminVerifyToken, adminVideoController.softDelete);

module.exports = adminVideoRouter