const handlerFactory = require('./handlerFactory');
const Message = require('./../models/messageModel');
exports.createMessage = handlerFactory.createOne(Message);
exports.getMessages = handlerFactory.getAll(Message);