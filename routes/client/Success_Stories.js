const express =  require('express');
const clientStoriesRouter = express.Router();
const clientStoriesController = require('../../controller/client/Success_Stories_Controller');

clientStoriesRouter.get('/client/success_stories', clientStoriesController.index);

module.exports = clientStoriesRouter