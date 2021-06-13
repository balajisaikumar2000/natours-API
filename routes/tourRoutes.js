const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const Tour = require('../models/tourModel');

const router = express.Router();

// router.param('id', tourController.checkID);//middleware

//create a checkbody middleware
//check if body contains the name and price property
//if not,send back 400(bad request)
//And it to the post handler stack

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
