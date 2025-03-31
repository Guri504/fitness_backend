const express = require("express");
const AdminMembershipPlanServicesRouter = express.Router();
const AdminMembershipPlanServicesController = require("../../controller/admin/MembershipPlanServicesController");

AdminMembershipPlanServicesRouter.get('/admin/membershipPlanServices', AdminMembershipPlanServicesController.index);
AdminMembershipPlanServicesRouter.post('/admin/membershipPlanService/add', AdminMembershipPlanServicesController.add);
AdminMembershipPlanServicesRouter.put('/admin/membershipPlanService/edit/:id', AdminMembershipPlanServicesController.update);
AdminMembershipPlanServicesRouter.get('/admin/membershipPlanService/view/:id', AdminMembershipPlanServicesController.detail);
AdminMembershipPlanServicesRouter.delete('/admin/membershipPlanService/delete/:id', AdminMembershipPlanServicesController.deleteRow);

module.exports = AdminMembershipPlanServicesRouter;