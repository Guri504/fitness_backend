const express = require("express");
const AdminStartegyPlansRouter = express.Router();
const AdminStrategyPlansController = require("../../controller/admin/Strategy_Plans_Controller");

AdminStartegyPlansRouter.get('/admin/strategy_plans', AdminStrategyPlansController.index);
AdminStartegyPlansRouter.post('/admin/strategy_plan/add', AdminStrategyPlansController.add);
AdminStartegyPlansRouter.put('/admin/strategy_plan/edit/:id', AdminStrategyPlansController.update);
AdminStartegyPlansRouter.get('/admin/strategy_plan/view/:id', AdminStrategyPlansController.detail);
AdminStartegyPlansRouter.delete('/admin/strategy_plan/delete/:id', AdminStrategyPlansController.deleteRow);

module.exports = AdminStartegyPlansRouter;