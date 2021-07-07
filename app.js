const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean')
const cors = require('cors');
const bodyParser = require('body-parser');
const hpp = require('hpp');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

// Allow Cross-origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API
const limiter = rateLimit({
    max: 150,
    windowMs: 60 *60 * 1000,
    message: 'Too many request from this IP, please try again in an hour'
});
app.use('/api', limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Body parser, reading data from body to req
app.use(express.json({
    limit: '15kb'
}));

// Data sanitixation against XSS (clean, userinput from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Routes

// Handle unexisiting routes
app.use('*', (req, res, next) => {
    const err = new AppError(process.env.HTTP_NOT_FOUND_STATUS_CODE, process.env.ERROR_STATUS, 'Route does not exist');
    next(err, req, res, next);
});

app.use(globalErrorHandler);

module.exports = app;