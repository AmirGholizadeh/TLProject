const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title.']
    },
    message: {
        type: String,
        required: [true, 'Please type a message.']
    },
    from: {
        type: String,
        default: 'Manager'
    }
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;