const express =  require('express');
const clientAboutMeRouter = express.Router();
const clientAboutMeController = require('../../controller/client/About_Me_Controller');

clientAboutMeRouter.get('/client/about_me_winner', clientAboutMeController.index);

module.exports = clientAboutMeRouter