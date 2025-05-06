const express = require('express')
const adminUsersRouter = express.Router();
const adminUsersController = require('../../controller/admin/UsersController');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminUsersRouter.get('/admin/users', adminVerifyToken, adminUsersController.index);
adminUsersRouter.get('/admin/user/view/:id', adminVerifyToken, adminUsersController.detail);
adminUsersRouter.delete('/admin/user/delete/:id', adminVerifyToken, adminUsersController.deleteRow);

module.exports = adminUsersRouter;