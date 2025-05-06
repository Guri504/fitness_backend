const express = require('express');
const clientVideoRouter = express.Router();
const clientVideoController = require('../../controller/client/Videos_Controller');

clientVideoRouter.get('/client/videos', clientVideoController.index);

module.exports = clientVideoRouter