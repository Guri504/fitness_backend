const express = require("express");
const AdminTrainingPlanServicesRouter = express.Router();
const AdminTrainingPlanServicesController = require("../../controller/admin/TrainingPlanServicesController");
const { adminVerifyToken } = require("../../middleware/authmiddleware");

AdminTrainingPlanServicesRouter.get('/admin/trainingPlanServices', adminVerifyToken, AdminTrainingPlanServicesController.index);
AdminTrainingPlanServicesRouter.post('/admin/trainingPlanService/add', adminVerifyToken, AdminTrainingPlanServicesController.add);
AdminTrainingPlanServicesRouter.put('/admin/trainingPlanService/edit/:id', adminVerifyToken, AdminTrainingPlanServicesController.update);
AdminTrainingPlanServicesRouter.get('/admin/trainingPlanService/view/:id', adminVerifyToken, AdminTrainingPlanServicesController.detail);
AdminTrainingPlanServicesRouter.put('/admin/trainingPlanService/delete/:id', adminVerifyToken, AdminTrainingPlanServicesController.deleteRow);

module.exports = AdminTrainingPlanServicesRouter;