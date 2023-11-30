import { ITask } from "./types/tasks";

const baseUrl = "http://localhost:8080/api/todos";

export const getAllTodos = async () : Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/getAll`,{
        cache: "no-store"
    });
    const todos = await res.json();
    return todos;
}

export const addTodo = async (todo : ITask) : Promise<ITask> => {
    const res = await fetch(`${baseUrl}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    });

    const newTodo = await res.json();
    return newTodo;
 
}

export const editTodo = async (todo : ITask) : Promise<ITask> => {
    console.log(todo);
    const res = await fetch(`${baseUrl}/update/${todo._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    });

    const updatedTodo = await res.json();
    return updatedTodo;
 
}

export const deleteTodo = async (id : string) : Promise<void> => {
      await fetch(`${baseUrl}/delete/${id}`, {
        method: "DELETE",
    }); 
}



