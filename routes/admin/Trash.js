const express = require('express');
const adminTrashRouter = express.Router();
const adminTrashController = require('../../controller/admin/Trash_Controller');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminTrashRouter.get('/admin/trash/:type', adminVerifyToken, adminTrashController.getTrashListing);
adminTrashRouter.put('/admin/trash/undo/:type', adminVerifyToken, adminTrashController.undoDelete);
adminTrashRouter.delete('/admin/trash/delete/:type', adminVerifyToken, adminTrashController.deletePermanently);

module.exports = adminTrashRouter