const express = require("express");
const AdminStartegyPlansRouter = express.Router();
const AdminStrategyPlansController = require("../../controller/admin/Strategy_Plans_Controller");
const { adminVerifyToken } = require("../../middleware/authmiddleware");

AdminStartegyPlansRouter.get('/admin/strategy_plans', adminVerifyToken, AdminStrategyPlansController.index);
AdminStartegyPlansRouter.post('/admin/strategy_plan/add', adminVerifyToken, AdminStrategyPlansController.add);
AdminStartegyPlansRouter.put('/admin/strategy_plan/edit/:id', adminVerifyToken, AdminStrategyPlansController.update);
AdminStartegyPlansRouter.get('/admin/strategy_plan/view/:id', adminVerifyToken, AdminStrategyPlansController.detail);
AdminStartegyPlansRouter.delete('/admin/strategy_plan/delete/:id', adminVerifyToken, AdminStrategyPlansController.deleteRow);

module.exports = AdminStartegyPlansRouter;