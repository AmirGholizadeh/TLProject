const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Username must be unique.'],
        required: [true, 'Please provide a username.']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
        validator: [validator.isEmail, 'Please provide a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords aren\'t the same'
        }
    },
    todos: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Todo'
    }],
    role: {
        type: String,
        enum: ['user', 'manager', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    messagesRead: {
        type: Boolean,
        default: true
    },
    messages: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Message'
    }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 13);
    this.passwordConfirm = undefined;
    next();
});
userSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'todos',
        select: '-__v'
    });
    this.populate({
        path: 'messages',
        select: '-__v'
    });
    next();

});
userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;