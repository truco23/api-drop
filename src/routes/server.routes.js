const express       = require('express');
const routes        = express.Router();
const multer        = require('multer');
const multerConfig  = require('../config/multer');

const boxController = require('../controllers/box.controller');
const fileController= require('../controllers/file.controller');

routes
    .route('/box')
    .get(boxController.list)
    .post(boxController.create)

routes
    .route('/box/:id')
    .get(boxController.listById)
    .delete(boxController.remove)

routes
    .route('/file')
    .get(fileController.list)
    

routes
    .route('/file/:id')
    .get(fileController.listById)

routes
    .route('/file/box/:id')
    .post(multer(multerConfig).single('file'), fileController.create)
    .delete(fileController.remove)

module.exports = routes;