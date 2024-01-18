import React, { useState, useEffect } from "react";

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");
    const [allTodos, setAllTodos] = useState([]);

    const getProfile = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token } 
            });

            const parseResponse = await response.json();

            //console.log(parseResponse);
            setAllTodos(parseResponse);
            
            setName(parseResponse[0].user_name);
            console.log(parseResponse[0].user_name);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getProfile()
    }, []);

    console.log(name);


    const onClickLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem("token");
        setAuth(false);
    };


    return (
        <>
            <p>Welcome, {name}!</p>
            <p>Here's your to-do list.</p>
            <button onClick={(e) => onClickLogout(e)}>Log out</button>
            <InputTodo />
            <ListTodos allTodos={allTodos}/>
        </>
    );

}

export default Dashboard;