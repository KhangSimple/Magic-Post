import express from 'express';
let router = express.Router();

const initAPIRoute = (app) => {
  return app.use('/', router);
};

export default initAPIRoute;
