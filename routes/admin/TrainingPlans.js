const express = require("express");
const AdminTrainingPlansRouter = express.Router();
const AdminTrainingPlansController = require("../../controller/admin/TrainingPlansController");

AdminTrainingPlansRouter.get('/admin/trainingPlans', AdminTrainingPlansController.index);
AdminTrainingPlansRouter.post('/admin/trainingPlan/add', AdminTrainingPlansController.add);
AdminTrainingPlansRouter.put('/admin/trainingPlan/edit/:id', AdminTrainingPlansController.update);
AdminTrainingPlansRouter.get('/admin/trainingPlan/view/:id', AdminTrainingPlansController.detail);
AdminTrainingPlansRouter.delete('/admin/trainingPlan/delete/:id', AdminTrainingPlansController.deleteRow);

module.exports = AdminTrainingPlansRouter;