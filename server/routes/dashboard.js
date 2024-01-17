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
router.post("/todos", authorization, async (req, res) => {
    try {
      const { description } = req.body;
  
      // If 'completed' is not provided in the request body, default it to false
      const newTodo = await pool.query("INSERT INTO todos (user_id, description) VALUES($1, $2) RETURNING *", [req.user.id, description]);
  
      res.json(newTodo.rows[0]);
  
    } catch (err) {
      console.error(err.message);
    }
  });
  

//route to update a todo
router.put("/todos/:id", authorization, async (req, res) => {
    try {
      const { id } = req.params;
      const { completed } = req.body; // Use 'completed' instead of 'description'
      
      const updateTodo = await pool.query(
        "UPDATE todos SET completed = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *", [completed, id, req.user.id]
      );
      if (updateTodo.rows.length === 0) {
        return res.json("This todo is not yours to update.")
      }

      res.json("Todo was updated");
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

//route to delete a todo
router.delete("/todos/:id", authorization, async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *", [id, req.user.id]);
  
      if (deleteTodo.rows.length === 0) {
        return res.json("This todo is not yours to delete.");
      }
  
      res.json({ message: `Todo deleted.` });
  
    } catch (error) {
      console.error(error.message); // Fix the variable name here
      res.status(500).json({ error: "Internal Server Error" });
    }
  });  

module.exports = router;