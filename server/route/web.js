import express from 'express';
import homeController from '../controller/homeController.js';
let router = express.Router();

const initWebRoute = (app) => {
  router.post('/employeeLogin', homeController.getEmployeePage);
  router.post('/managerLogin', homeController.getManagerPage);
  router.post('/register', homeController.register);
  return app.use('/', router);
};

export default initWebRoute;
