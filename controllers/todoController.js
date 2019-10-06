const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Todo = require('./../models/todoModel');
const handlerFactory = require('./../controllers/handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
exports.getTodos = handlerFactory.getAll(Todo, [{
    $sort: { priorityNumber: -1 }
}]);
exports.createAndAddTodo = catchAsync(async(req, res, next) => {
    const newTodo = await Todo.create(req.body);
    await User.findByIdAndUpdate(req.user._id, { $push: { "todos": newTodo._id } }, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: {
            data: newTodo
        }
    });

});
exports.getTodo = handlerFactory.getOne(Todo);
exports.createTodo = handlerFactory.createOne(Todo);
exports.updateTodo = handlerFactory.updateOne(Todo);
exports.deleteTodo = handlerFactory.deleteOne(Todo);
exports.deleteTodos = handlerFactory.deleteAll(Todo);