const express = require("express");
const adminPagesRouter = express.Router();
const adminPagesController = require("../../controller/admin/PagesController");

adminPagesRouter.put('/admin/update-page-content/:slug', adminPagesController.updatePageContent);
adminPagesRouter.get('/admin/get-page-content/:slug', adminPagesController.getPageContent);

module.exports = adminPagesRouter;