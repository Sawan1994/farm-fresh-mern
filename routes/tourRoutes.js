const express = require('express');
const tourController = require('../controllers/tourController');

const { getAllTours, createTour, getTour, deleteTour, checkId, checkBody } =
  tourController;

const tourRouter = express.Router();

tourRouter.param('id', checkId);

tourRouter.route('/').get(getAllTours).post(checkBody, createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour);

module.exports = tourRouter;
