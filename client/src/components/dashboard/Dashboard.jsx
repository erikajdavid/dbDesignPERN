import React, { useState, useEffect } from "react";

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

    const getProfile = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token } 
            });

            const parseResponse = await response.json();

            setAllTodos(parseResponse);
            setName(parseResponse[0].user_name);

        } catch (error) {
            console.error(error.message);
        }
    };

    const onClickLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem("token");
        setAuth(false);
    };

    useEffect(() => {
        getProfile();
        setTodosChange(false);
    }, [todosChange]);

    return (
        <>
            <p>Welcome, {name}!</p>
            <p>Here's your to-do list.</p>
            <button onClick={(e) => onClickLogout(e)}>Log out</button>
            <InputTodo setTodosChange={setTodosChange}/>
            <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
        </>
    );
}

export default Dashboard;