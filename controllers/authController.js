const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    res.cookie('jsonwebtoken', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    });
    console.log(req.cookies);
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};
exports.updatePassword = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user._id).select('+password');
    const isCorrect = user.correctPassword(req.body.currentPassword, user.password);
    if (!isCorrect) {
        return next(new AppError('Password is wrong, Please try again.', 401));
    }
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.confirmPassword;
    user.save();
    res.status(200).json({
        status: 'success'
    });

});
exports.signup = catchAsync(async(req, res) => {

    const newUser = await User.create({
        name: req.body.name,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        email: req.body.email,
        messagesRead: false,
        messages: '5d9893a0ce715019209eed1b'
    });
    createSendToken(newUser, 201, req, res);
});
exports.login = catchAsync(async(req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return next(new AppError('Please provide username and password!', 400));
    }
    const user = await User.findOne({ name }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect username or password', 401));
    }
    createSendToken(user, 200, req, res);
});
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }
        next();
    };
};
exports.protect = catchAsync(async(req, res, next) => {
    let token;
    if (req.cookies.jsonwebtoken) {
        token = req.cookies.jsonwebtoken;
    } else {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});
exports.isLoggedIn = async(req, res, next) => {
    if (req.cookies.jsonwebtoken) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jsonwebtoken,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }
            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            req.user = currentUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};
exports.logout = (req, res) => {
    res.cookie('jsonwebtoken', 'loggedout', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        status: 'success'
    });
};