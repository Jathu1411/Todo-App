const router = require('express').Router();
const todoController = require('../controller/todoController');

router.get('/getAll', todoController.getAllTodos);
router.post('/add', todoController.addTodo);
router.put('/update/:todoId', todoController.updateTodo);
router.delete('/delete/:todoId', todoController.deleteTodo);

module.exports = router;