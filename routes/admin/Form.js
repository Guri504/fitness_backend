const express = require("express");
const adminFormRouter = express.Router();
const adminFormController = require('../../controller/admin/FormController');
const { adminVerifyToken } = require("../../middleware/authmiddleware");


adminFormRouter.get('/admin/form', adminVerifyToken, adminFormController.index);
adminFormRouter.post('/admin/form/add', adminVerifyToken, adminFormController.add);
adminFormRouter.get('/admin/form/view/:id', adminVerifyToken, adminFormController.detail);


module.exports = adminFormRouter;