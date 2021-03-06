const express = require('express');
const todoController = require('./../controllers/todoController');
const authController = require('./../controllers/authController');
const router = express.Router();
router.use(authController.protect);
// router.patch('/createTodo', todoController.createTodo);
// router.post('/createTodo', userController.updateMe);
// router.delete('/deleteMyTodo/:id', userController.deleteMyTodo);
router.post('/createAndAddTodo', todoController.createAndAddTodo);
router.route('/').get(todoController.getTodos).post(todoController.createTodo).delete(todoController.deleteTodos);
router.route('/:id').patch(todoController.updateTodo).get(todoController.getTodo).delete(todoController.deleteTodo);
module.exports = router;