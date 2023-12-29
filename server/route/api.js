import express from 'express';
import apiController from '../controller/apiController.js';
import auth from '../middleware/auth.js';
let router = express.Router();
// router.use(auth);
const initAPIRoute = (app) => {
  router.post('/createStaffTransAccount', auth, apiController.createStaffTransAccount);
  router.post('/createStaffCollAccount', auth, apiController.createStaffCollAccount);
  router.post('/deleteStaffTransAccount', auth, apiController.deleteStaffTransAccount);
  router.post('/deleteStaffCollAccount', auth, apiController.deleteStaffCollAccount);
  router.get('/getTransactionList', auth, apiController.getTransactionList);
  router.get('/getCollectionList', auth, apiController.getCollectionList);
  router.post('/createParcel', auth, apiController.createParcel);
  router.post('/sendParcel', auth, apiController.sendParcel);
  router.post('/confirmParcel', auth, apiController.confirmParcel);
  router.get('/searchParcel', apiController.searchParcel);
  router.post('/addTransaction', auth, apiController.addTransaction);
  router.post('/addCollection', auth, apiController.addCollection);
  router.get('/getArrivalParcelPackage', auth, apiController.getArrivalParcelPackage);
  router.get('/getSendedParcelPackage', auth, apiController.getSendedParcelPackage);
  router.get('/getPackageDetail', auth, apiController.getPackageDetail);
  // router.post('/sendPackage', auth, apiController.sendPackage);
  router.post('/confirmCollecionPackage', auth, apiController.confirmCollecionPackage);
  router.post('/confirmTransactionPackage', auth, apiController.confirmTransactionPackage);
  router.get('/getCollectionPackageDetail', auth, apiController.getCollectionPackageDetail);
  router.get('/getTransactionPackageDetail', auth, apiController.getTransactionPackageDetail);
  router.post('/createCollectionPackage', auth, apiController.createCollectionPackage);
  router.post('/createTransactionPackage', auth, apiController.createTransactionPackage);
  router.get('/getTransactionStaffList', apiController.getTransactionStaffList);
  router.get('/getCollectionStaffList', apiController.getCollectionStaffList);
  router.get('/collectionStatistic', apiController.collectionStatistic);
  router.get('/collectionStatisticTrans', apiController.collectionStatisticTrans);
  router.get('/transactionStatistic', apiController.transactionStatistic);
  router.get('/transactionStatisticColl', apiController.transactionStatisticColl);
  router.get('/getSuccessNFailParcel', apiController.getSuccessNFailParcel);
  router.get('/getUserParcelList', apiController.getUserParcelList);
  router.post('/updateTransactionUserProfile', apiController.updateTransactionUserProfile);
  router.post('/updateCollectionUserProfile', apiController.updateCollectionUserProfile);
  return app.use('/', router);
};

export default initAPIRoute;
