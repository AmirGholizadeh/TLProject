const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A todo item must have a name.'],
        unique: [true, 'A todo item\'s name must be unique.']
    },
    description: {
        type: String,
        default: 'No description.'
    },
    time: {
        type: String,
        default: 'No time specified.'
    },
    priority: {
        type: String,
        default: 'low'
    },
    priorityNumber: Number
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
todoSchema.pre('save', function(next) {
    if (this.priority === 'low') {
        this.priorityNumber = 1;
        next();
    } else if (this.priority === 'medium') {
        this.priorityNumber = 2;
        next();
    } else if (this.priority === 'high') {
        this.priorityNumber = 3;
        next();
    }

});
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;