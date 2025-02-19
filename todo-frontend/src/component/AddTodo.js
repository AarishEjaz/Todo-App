import React, { useState } from 'react'

const AddTodo = ({onAdd})=> {
    const [todo,setTodo] = useState('')
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!todo) return;
        onAdd(todo)

    }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder = "Add a new Todo"
        required
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodo