const express = require('express');
const adminDeleteManyRouter = express.Router();
const adminDeleteManyController = require('../../controller/admin/Delete_Many_Controller');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminDeleteManyRouter.put('/admin/delete-many', adminVerifyToken, adminDeleteManyController.softDeleteData);

module.exports = adminDeleteManyRouter;