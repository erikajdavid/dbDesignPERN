import React, { useState } from "react";

const InputTodo = ({ setTodosChange }) => {

    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);

            console.log(localStorage.token);

            const body = { description };
            await fetch("http://localhost:5000/dashboard/todos", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            setTodosChange(true);
            setDescription("");
            
        } catch (err) {
            console.error(err.message);        
        }
    };

    return (
        <>
            <h1>Your To-do list!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description"></label>
                <input 
                    type="text" 
                    id="description" 
                    name="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a todo..." 
                    required>
                </input>
                <button type="submit">+</button>
            </form>
        </>
    );
}

export default InputTodo;