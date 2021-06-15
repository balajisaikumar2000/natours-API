const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRouter');
// const reviewController = require('../controllers/reviewController');

const Tour = require('../models/tourModel');

const router = express.Router();

// router.param('id', tourController.checkID);//middleware

//create a checkbody middleware
//check if body contains the name and price property
//if not,send back 400(bad request)
//And it to the post handler stack

router.use('/:tourId/reviews', reviewRouter); //whenever we encounter that url we will redirect to reviewRouter
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
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
