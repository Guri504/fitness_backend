// ADMIN ROUTES
exports.adminPagesRouter = require('./admin/Pages');
exports.adminBlogsRouter = require('./admin/Blogs');
exports.adminFormRouter = require('./admin/Form');
exports.adminUsersRouter = require('./admin/Users');
exports.adminBlogsCategoryRouter = require('./admin/BlogsCategory');
exports.uploadsRouter = require('./Uploads');
exports.AdminMembershipPlanServicesRouter = require('./admin/MembershipPlanServices')
exports.AdminTrainingPlanServicesRouter = require('./admin/TrainingPlanServices')
exports.AdminMembershipPlansRouter = require('./admin/MembershipPlans')
exports.AdminTrainingPlansRouter = require('./admin/TrainingPlans')




// CLIENT ROUTES
exports.clientBlogsRouter = require('./client/Blogs');
exports.clientBlogsCategoryRouter = require('./client/BlogsCategory');
exports.clientUsersRouter = require('./client/Users');
exports.clientloginRouter = require('./client/Login');
exports.ClientMembershipPlanServicesRouter = require('./client/MembershipPlanServices')