const express = require('express')
const adminUsersRouter = express.Router();
const adminUsersController = require('../../controller/admin/UsersController')

adminUsersRouter.get('/admin/users',adminUsersController.index);
adminUsersRouter.get('/admin/user/view/:id',adminUsersController.detail);
adminUsersRouter.delete('/admin/user/delete/:id', adminUsersController.deleteRow);

module.exports = adminUsersRouter;