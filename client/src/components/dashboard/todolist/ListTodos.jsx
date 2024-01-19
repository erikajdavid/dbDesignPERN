import React, { useState, useEffect } from "react";

import UpdateTodo from "./UpdateTodo";

const ListTodos = ({ allTodos, setTodosChange }) => {

    console.log(allTodos);
    const [todos, setTodos] = useState([]);

    //delete todo
    const deleteTodoOnClick = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
                method: "DELETE",
                headers: {token: localStorage.token}
            });
            
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    //get all todos
    const getAllTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/todos", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };

            const parseResponse = await response.json();
            setTodos(parseResponse);
            
        } catch (err) {
            console.error(err.message);
        }   
    };

    useEffect(() => {
        setTodos(allTodos);
    },[allTodos]);

    return (
        <>
            <ul>
                {todos.length !== 0 && todos[0].todo_id !== null && todos.map((todo) => {
                    return (
                        <li key={todo.todo_id} className="listContainer">
                            <UpdateTodo
                                id={todo.todo_id}
                                storedCompleted={todo.completed}
                                setTodosChange={setTodosChange}
                            />
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