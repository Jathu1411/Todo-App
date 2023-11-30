const todoModel = require('../model/todoModel');

const getAllTodos = async () => {
    try {
        const todos = await todoModel.find();
        return todos;
    } catch (error) {
        throw new Error(error);
    }

}

const addTodo = async (todo) => {
    try {
        const newTodo = new todoModel({
            title: todo.title,
            description: todo.description,

        });
        const savedTodo = await newTodo.save();
        return savedTodo;
    } catch (error) {
        throw new Error(error);
    }
}

const updateTodo = async (todoId, updatedTodo) => {
    try {
        
        const existingTodo = await todoModel.findById(todoId);
        if (!existingTodo) {
            throw new Error("Todo not found");
        }

        existingTodo.title = updatedTodo.title || existingTodo.title;
        existingTodo.description = updatedTodo.description || existingTodo.description;
        existingTodo.isCompleted =
        updatedTodo.isCompleted !== undefined ? updatedTodo.isCompleted : existingTodo.isCompleted;
        const savedTodo = await existingTodo.save();
        return savedTodo;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteTodo = async (todoId) => {
    try {
        const deletedTodo = await todoModel.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            throw new Error("Todo not found");
        }
        return deletedTodo;
    } catch (error) {
        throw new Error(error);
    }
};



module.exports = {
    getAllTodos,
    addTodo,
    deleteTodo,
    updateTodo,
}