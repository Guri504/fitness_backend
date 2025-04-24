const express = require('express');
const uploadRouter = express.Router();

const UploadsController = require('../controller/UploadsController');

uploadRouter.post('/uploads/base64', UploadsController.upload);
uploadRouter.post('/uploads/video', UploadsController.videoUploaded);

module.exports = uploadRouter;