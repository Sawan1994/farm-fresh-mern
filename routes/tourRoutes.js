const express = require('express');
const tourController = require('../controllers/tourController');

const { getAllTours, createTour, getTour, deleteTour } = tourController;

const tourRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour);

module.exports = tourRouter;
