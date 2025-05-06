const express = require("express");
const AdminMembershipPlanServicesRouter = express.Router();
const AdminMembershipPlanServicesController = require("../../controller/admin/MembershipPlanServicesController");
const { adminVerifyToken } = require("../../middleware/authmiddleware");

AdminMembershipPlanServicesRouter.get('/admin/membershipPlanServices', adminVerifyToken, AdminMembershipPlanServicesController.index);
AdminMembershipPlanServicesRouter.post('/admin/membershipPlanService/add', adminVerifyToken, AdminMembershipPlanServicesController.add);
AdminMembershipPlanServicesRouter.put('/admin/membershipPlanService/edit/:id', adminVerifyToken, AdminMembershipPlanServicesController.update);
AdminMembershipPlanServicesRouter.get('/admin/membershipPlanService/view/:id', adminVerifyToken, AdminMembershipPlanServicesController.detail);
AdminMembershipPlanServicesRouter.put('/admin/membershipPlanService/delete/:id', adminVerifyToken, AdminMembershipPlanServicesController.deleteRow);

module.exports = AdminMembershipPlanServicesRouter;