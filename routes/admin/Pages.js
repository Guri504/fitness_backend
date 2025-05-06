const express = require("express");
const adminPagesRouter = express.Router();
const adminPagesController = require("../../controller/admin/PagesController");
const { adminVerifyToken } = require("../../middleware/authmiddleware");

adminPagesRouter.put('/admin/update-page-content/:slug', adminVerifyToken, adminPagesController.updatePageContent);
adminPagesRouter.get('/admin/get-page-content/:slug', adminVerifyToken, adminPagesController.getPageContent);

module.exports = adminPagesRouter;