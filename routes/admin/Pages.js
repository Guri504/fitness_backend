const express = require("express")
const adminPagesRouter = express.Router();

const adminPagesController = require('../../controller/admin/PagesController');

adminPagesRouter.get('/admin/pages', adminPagesController.index);
adminPagesRouter.post('/admin/page/add', adminPagesController.add);
adminPagesRouter.put('/admin/page/edit/:id', adminPagesController.update);
adminPagesRouter.delete('/admin/page/delete/:id', adminPagesController.deleteRow);
adminPagesRouter.get('/admin/page/view/:id', adminPagesController.detail);

module.exports = adminPagesRouter;