import express from 'express';
import apiController from '../controller/apiController.js';
let router = express.Router();

const initAPIRoute = (app) => {
  router.post('/createStaffTransAccount', apiController.createStaffTransAccount);
  router.post('/createStaffCollAccount', apiController.createStaffCollAccount);
  router.post('/deleteStaffTransAccount', apiController.deleteStaffTransAccount);
  router.post('/deleteStaffCollAccount', apiController.deleteStaffCollAccount);

  return app.use('/', router);
};

export default initAPIRoute;
