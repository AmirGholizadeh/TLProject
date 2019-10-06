const User = require('./../models/userModel');
const Message = require('./../models/messageModel');
const handlerFactory = require('./../controllers/handlerFactory');
const catchAsync = require('./../utils/catchAsync');
exports.getUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User);
exports.updateMe = catchAsync(async(req, res, next) => {
    if (req.body.todos) {
        const updatedDoc = await User.findByIdAndUpdate(req.user._id, { $push: { "todos": req.body.todos } });
        res.status(200).json({
            status: 'success',
            data: {
                data: updatedDoc
            }
        });
    } else {
        handlerFactory.updateOne(User);
    }
});
exports.deleteMyTodo = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user._id);
    const userTodos = user.todos;
    console.log(userTodos.length);
    userTodos.forEach(el => {
        if (el._id === req.params.id) {
            el.delete();
            console.log(`successfuly deleted ${el}`);
        }
    });
    console.log(userTodos.length);
    await user.save({
        validateBeforeSave: false
    });
    res.status(204).json({
        status: 'success'
    });
});
exports.sendMessageAll = catchAsync(async(req, res, next) => {
    const message = await Message.create(req.body);
    const users = await User.find();
    const role = req.user.role;
    users.forEach(async user => {
        if (user.role !== role) await User.findByIdAndUpdate(user._id, { messages: message._id, messagesRead: false });

    });
    res.status(200).json({
        status: 'success'
    });
});
exports.updateInfo = catchAsync(async(req, res, next) => {
    let data = {};
    if (req.body.name) data.name = req.body.name;
    if (req.body.email) data.email = req.body.email;
    await User.findByIdAndUpdate(req.user._id, data);
    res.status(201).json({
        status: 'success'
    });
});
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.deleteUsers = handlerFactory.deleteAll(User);
exports.createUser = handlerFactory.createOne(User);