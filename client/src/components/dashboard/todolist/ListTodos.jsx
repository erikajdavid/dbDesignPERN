import React, { useState, useEffect } from "react";

import UpdateTodo from "./UpdateTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    //delete todo
    const deleteTodoOnClick = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
            });
            
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    //get all todos
    const getAllTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };

            const data = await response.json();
            const orderedTodos = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setTodos(orderedTodos);
            console.log(data);
            
        } catch (err) {
            console.error(err.message);
        }   
    }

    useEffect(() => {
        getAllTodos();
    },[]);

    return (
        <>
            <ul>
            {todos.map((todo) => {
                return (
                    <li key={todo.todo_id} className="listContainer">
                        <UpdateTodo id={todo.todo_id} completed={todo.completed} />
                        {todo.description}
                        <button onClick={() => deleteTodoOnClick(todo.todo_id)}>delete</button>
                    </li>
                );
            })}
            </ul>
        </>
    );

}

export default ListTodos;