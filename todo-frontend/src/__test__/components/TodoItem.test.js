import React from "react"
import { render, fireEvent, screen } from "@testing-library/react";
import TodoItem from "../../component/Todoitem";

describe("Testing the Todo Item component",()=>{
    const mockTodo = {_id:"1",title:"New Todo", completed:false}
    test("check if the todo title gets rendered",()=>{
        render(<TodoItem todo={mockTodo} />)
        expect(screen.getByText("New Todo")).toBeInTheDocument()
    })
})