import React, { useState, useEffect } from "react";

import InputTodo from "./todolist/InputTodo";

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");

    const getName = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token } 
            });

            const parseResponse = await response.json();

            //console.log(parseResponse);
            
            setName(parseResponse[1].user_name);
            console.log(parseResponse[1].user_name);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getName()
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
        </>
    );

}

export default Dashboard;