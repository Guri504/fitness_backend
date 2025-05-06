const express = require('express')
const adminEmailLOgsRouter = express.Router();
const adminEmailLogsController = require('../../controller/admin/Email_Logs_Controller');
const { adminVerifyToken } = require('../../middleware/authmiddleware');

adminEmailLOgsRouter.get('/admin/email-logs', adminVerifyToken, adminEmailLogsController.listing);
adminEmailLOgsRouter.get('/admin/email-log/view/:id', adminVerifyToken, adminEmailLogsController.view);

module.exports = adminEmailLOgsRouter