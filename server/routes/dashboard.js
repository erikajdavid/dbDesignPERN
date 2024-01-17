const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorization = require("../middlewear/authorization");

//route to get all todos and name

router.get("/", authorization, async (req, res) => {
    try {

        // const user = await pool.query("SELECT * FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1", [req.user.id]);

        //using left join because you want users even if they don't have any todos created

        //here's a shorter way to wraite the code on line 11

        const user = await pool.query("SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1", [req.user.id]);

        res.json(user.rows);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Server error.` });
    }
})

//route to create a todo

//route to update a todo

//route to delete a todo

module.exports = router;