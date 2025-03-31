const express = require("express");
const adminFormRouter = express.Router();
const adminFormController = require('../../controller/admin/FormController');


adminFormRouter.get('/admin/form', adminFormController.index);
adminFormRouter.post('/admin/form/add', adminFormController.add);
adminFormRouter.get('/admin/form/view/:id', adminFormController.detail);


module.exports = adminFormRouter;