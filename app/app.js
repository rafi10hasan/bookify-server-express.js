require('dotenv').config('../.env');
const express = require('express');
const app = express();

const route  = require('./route');
const categoryRoute = require('../routes/categoryRoute')
const roomsRoute = require('../routes/roomsRoute')
const paymentRoute = require('../routes/paymentRoute')
const searchRoomRoute = require('../routes/searcRoomRoute')
const authRoute = require('../routes/authRoute')
const verifyRoute = require('../routes/verifyRoute')
const bookingRoute = require('../routes/bookingRoute')
const ratingRoute = require('../routes/ratingRoute')
const reviewRoute = require('../routes/reviewRoute')
const accommodationRoute = require('../routes/accommodationRoute')
const amenityRoute = require('../routes/amenityRoute')
const transactionRoute = require('../routes/transactionRoute')
const checkRoomRoute = require('../routes/chcekRoomRoute')
const profileRoute = require('../routes/profileRoute')
const contactRoute = require('../routes/contactRoute')
const dashboardRoute = require('../routes/dashboardRoute');

// all customize middleware
const middleware = require('./middleware');

//database connect
const connectDB = require('../config/database.config');
const { globalErrorHandler } = require('./error');

//middleware
app.use(middleware)
app.use(route)

connectDB()

// all api route middleware

app.use('/categories',categoryRoute);
app.use('/rooms',roomsRoute);
app.use('/searchrooms',searchRoomRoute);
app.use('/auth',authRoute);
app.use('/rating',ratingRoute);
app.use('/reviews',reviewRoute);
app.use('/accommodations',accommodationRoute);
app.use('/amenity',amenityRoute)
app.use('/check',checkRoomRoute);
app.use('/verify',verifyRoute)
app.use('/api/payment', paymentRoute);
app.use('/booking',bookingRoute);
app.use('/profile',profileRoute);
app.use('/contact',contactRoute);
app.use('/transaction',transactionRoute);
app.use('/dashboard',dashboardRoute);

app.use(globalErrorHandler)

module.exports = app