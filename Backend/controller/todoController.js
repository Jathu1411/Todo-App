const todoService = require('../service/todoService');
const getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addTodo = async (req, res) => {
    try {
        const todo = req.body;
        const newTodo = await todoService.addTodo(todo);
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const updatedTodo = req.body;

        const updatedTodoItem = await todoService.updateTodo(todoId, updatedTodo);

        res.status(200).json(updatedTodoItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;

        const deletedTodo = await todoService.deleteTodo(todoId);

        res.status(200).json(deletedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo,
};