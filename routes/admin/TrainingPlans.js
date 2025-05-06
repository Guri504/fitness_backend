const express = require("express");
const AdminTrainingPlansRouter = express.Router();
const AdminTrainingPlansController = require("../../controller/admin/TrainingPlansController");
const { adminVerifyToken } = require("../../middleware/authmiddleware");

AdminTrainingPlansRouter.get('/admin/trainingPlans', adminVerifyToken, AdminTrainingPlansController.index);
AdminTrainingPlansRouter.post('/admin/trainingPlan/add', adminVerifyToken, AdminTrainingPlansController.add);
AdminTrainingPlansRouter.put('/admin/trainingPlan/edit/:id', adminVerifyToken, AdminTrainingPlansController.update);
AdminTrainingPlansRouter.get('/admin/trainingPlan/view/:id', adminVerifyToken, AdminTrainingPlansController.detail);
AdminTrainingPlansRouter.delete('/admin/trainingPlan/delete/:id', adminVerifyToken, AdminTrainingPlansController.deleteRow);

module.exports = AdminTrainingPlansRouter;