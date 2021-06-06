const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');

const app = express();

//LEC->MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json()); //NOTE to work with json in req.body we need this middleware

app.use((req, res, next) => {
  console.log('Hello from the middleware ☺');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//LEC->ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
