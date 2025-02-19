const { info } = require("console");
const Todo = require("../models/todoModel");
const logger = require('../utils/logger')


 exports.getTodos = async(req,res)=>{
    //  console.log("Fetching todo from DB")
     try{
         const todos = await Todo.find()
        console.log(todos)
        logger.info(`fetch all the todos ${todos}`)
         res.status(200).json(todos);
     }catch(error){
         logger.error("Error: ", error.message)
         res.status(500).json({message:"something went wrong, please try later"})
     }
 }

 exports.addTodos = async (req, res) => {

  try{
    //  console.log("adding request", req.body);
    logger.info(`adding request, ${JSON.stringify(req.body.title.todo)}`);
    const title = req.body.title;
    const newTodo = new Todo({
      title: req.body.title,
    });
    //  console.log("Adding the todo to DB", newTodo);
    const savedTodo = await newTodo.save();
    //  console.log("added the todo to db", savedTodo);

    res.status(200).json(savedTodo);
  }catch(error){
    logger.error("Error while adding the todos")
    res.status(500).json({message:"something went wrong"})
  }

 };
