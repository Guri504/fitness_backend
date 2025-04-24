const express = require('express');
const adminTrashRouter = express.Router();
const adminTrashController = require('../../controller/admin/Trash_Controller');

adminTrashRouter.get('/admin/trash/:type', adminTrashController.getTrashListing);
adminTrashRouter.put('/admin/trash/undo/:type', adminTrashController.undoDelete);
adminTrashRouter.delete('/admin/trash/delete/:type', adminTrashController.deletePermanently);

module.exports = adminTrashRouter