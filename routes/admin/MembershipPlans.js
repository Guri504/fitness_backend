const express = require("express");
const AdminMembershipPlansRouter = express.Router();
const AdminMembershipPlansController = require("../../controller/admin/MembershipPlansController");
const { adminVerifyToken } = require("../../middleware/authmiddleware");

AdminMembershipPlansRouter.get('/admin/membershipPlans', adminVerifyToken, AdminMembershipPlansController.index);
AdminMembershipPlansRouter.post('/admin/membershipPlan/add', adminVerifyToken, AdminMembershipPlansController.add);
AdminMembershipPlansRouter.put('/admin/membershipPlan/edit/:id', adminVerifyToken, AdminMembershipPlansController.update);
AdminMembershipPlansRouter.get('/admin/membershipPlan/view/:id', adminVerifyToken, AdminMembershipPlansController.detail);
AdminMembershipPlansRouter.delete('/admin/membershipPlan/delete/:id', adminVerifyToken, AdminMembershipPlansController.deleteRow);

module.exports = AdminMembershipPlansRouter;