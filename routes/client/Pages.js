const express =  require('express');
const clientPagesRouter = express.Router();
const clientPagesController = require('../../controller/client/PagesController');

clientPagesRouter.get('/client/get-page-content/:slug', clientPagesController.getPageContent);

module.exports = clientPagesRouter