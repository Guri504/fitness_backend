const express = require("express");
const AdminMembershipPlansRouter = express.Router();
const AdminMembershipPlansController = require("../../controller/admin/MembershipPlansController");

AdminMembershipPlansRouter.get('/admin/membershipPlans', AdminMembershipPlansController.index);
AdminMembershipPlansRouter.post('/admin/membershipPlan/add', AdminMembershipPlansController.add);
AdminMembershipPlansRouter.put('/admin/membershipPlan/edit/:id', AdminMembershipPlansController.update);
AdminMembershipPlansRouter.get('/admin/membershipPlan/view/:id', AdminMembershipPlansController.detail);
AdminMembershipPlansRouter.delete('/admin/membershipPlan/delete/:id', AdminMembershipPlansController.deleteRow);

module.exports = AdminMembershipPlansRouter;