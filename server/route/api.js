import express from 'express';
import apiController from '../controller/apiController.js';
let router = express.Router();

const initAPIRoute = (app) => {
  router.post('/createStaffTransAccount', apiController.createStaffTransAccount);
  router.post('/createStaffCollAccount', apiController.createStaffCollAccount);
  router.post('/deleteStaffTransAccount', apiController.deleteStaffTransAccount);
  router.post('/deleteStaffCollAccount', apiController.deleteStaffCollAccount);
  router.get('/getTransactionList', apiController.getTransactionList);
  router.get('/getCollectionList', apiController.getCollectionList);
  router.post('/createParcel', apiController.createParcel);
  router.post('/sendParcel', apiController.sendParcel);
  router.post('/confirmParcel', apiController.confirmParcel);
  router.get('/searchParcel', apiController.searchParcel);
  return app.use('/', router);
};

export default initAPIRoute;
