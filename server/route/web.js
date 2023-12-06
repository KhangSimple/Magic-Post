import express from 'express';
import homeController from '../controller/homeController.js';
let router = express.Router();

const initWebRoute = (app) => {
  router.get('/transaction/:id', homeController.getTransactionPage);
  router.get('/employeeLogin/:id', homeController.getEmployeePage);
  return app.use('/', router);
};

export default initWebRoute;
