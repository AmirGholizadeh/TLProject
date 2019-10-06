const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');

const todoRouter = require('./routes/todoRouter');
const userRouter = require('./routes/userRouter');
const viewRouter = require('./routes/viewRouter');
const messageRouter = require('./routes/messageRouter');
const app = express();
// Set the view engine to pug
app.set('view engine', 'pug');

// Showing it's direction using path
app.set('views', path.join(__dirname, 'views'));
// serving static files
app.use(express.static('public'))
    // Add security HTTP headers
app.use(helmet());

app.use((req, res, next) => {
    console.log(`METHOD: ${req.method} | URL: ${req.originalUrl}`);
    next();
});
// to be able to read req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//to be able to read cookies
app.use(cookieParser());

// Routes
app.use('/', viewRouter);
app.use('/api/v1/todos', todoRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messageRouter);
app.use('*', (req, res, next) => {
    console.log(`${req.originalUrl} is not found.`)
});
app.use(globalErrorHandler);
module.exports = app;