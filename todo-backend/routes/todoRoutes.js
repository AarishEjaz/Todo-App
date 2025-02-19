const express = require('express')
const{getTodos, addTodos} = require("../controllers/todoController")


const router  = express.Router()

router.get("/get-todo",getTodos);

router.post("/add-todo",addTodos);

// router.delete("/delete-todo", )

module.exports = router