import React,{useEffect, useState} from 'react'

import AddTodo from "./AddTodo"
// import TodoItem from "./TodoItem"
import BACKEND_URL from '../config/config'
import TodoItem from './TodoItem'


const TodoList = ()=>{
    const [todos, setTodos] = useState([])

    useEffect(()=>{
        fetchTodos()
    },[])

    const fetchTodos = async() =>{
        try{
            const response = await fetch(`${BACKEND_URL}/get-todo`)
            const data  = await response.json()
            console.log(data)
            setTodos(data)
        }catch(error){
            console.error("erroe fetching the data",error.message)
        }
    }

    const addTodo = async(title) =>{
        console.log("Adding todo",title)
        try{
            const response = await fetch(`${BACKEND_URL}/add-todo`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title }),
            });
            console.log("response is", response)
            const newTodo = await response.json()
            setTodos((prev)=>[...prev,newTodo])
            console.log("response received", response);
        }catch(error){
            console.error("Error while creating the todo", error)
        }
    }

    const deleteTodo = async (title) => {
      console.log("Adding todo", title);
      try {
        const response = await fetch(`${BACKEND_URL}/add-todo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        });
        console.log("response is", response);
        const newTodo = await response.json();
        setTodos((prev) => [...prev, newTodo]);
        console.log("response received", response);
      } catch (error) {
        console.error("Error while creating the todo", error);
      }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodo onAdd = {addTodo}/>
            <ul>
                {
                    todos.map((todo)=>(
                        <TodoItem key = {todo._id} todo = {todo}/>
                    ))
                }
            </ul>
        </div>
    )
}

export default TodoList
