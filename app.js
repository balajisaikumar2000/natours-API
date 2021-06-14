const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');

const app = express();

//LEC->MIDDLEWARES

//set security HTTP headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 3,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP,Please try again in an hour!',
});

app.use('/api', limiter);

//body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' })); //NOTE to work with json in req.body we need this middleware

//serving static files
app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//LEC->ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}  on this server`, 404));
});

//IMP ERRor handling middleware
app.use(globalErrorHandler);

module.exports = app;
