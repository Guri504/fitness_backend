const express = require('express');
const adminVideoRouter = express.Router();
const adminVideoController = require('../../controller/admin/Videos_Controller');

adminVideoRouter.get('/admin/videos', adminVideoController.index);
adminVideoRouter.post('/admin/video/add', adminVideoController.add);
adminVideoRouter.put('/admin/video/edit/:id', adminVideoController.update);
adminVideoRouter.get('/admin/video/view/:id', adminVideoController.view);
adminVideoRouter.put('/admin/video/edit/:id', adminVideoController.softDelete);

module.exports = adminVideoRouter