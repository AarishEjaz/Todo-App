import React from "react"
import '@testing-library/react'
import {render,fireEvent,screen,cleanup} from "@testing-library/react"
import AddTodo from "../../component/AddTodo"
// import { afterEach } from "node:test"

afterEach(()=>{
    cleanup()
    jest.resetAllMocks()

})

describe("Testing the Add Todo component",()=>{
    test("render the input and add button",()=>{
        render(<AddTodo onAdd ={()=>{}} />)
        expect(screen.getByPlaceholderText("Add a new Todo")).toBeInTheDocument()
        expect(screen.getByRole("button",{name:"Add Todo"})).toBeInTheDocument()
    })
    test("When form is submitted, the onAdd function to be invoked",()=>{
        const mockOnAdd = jest.fn()
        render(<AddTodo onAdd = {mockOnAdd} />)

        const input = screen.getByPlaceholderText("Add a new Todo")
        const button = screen.getByRole("button",{name:"Add Todo"})

        fireEvent.change(input,{target:{value:"New Todo"}})
        fireEvent.click(button)

        expect(mockOnAdd).toHaveBeenCalledWith("New Todo")
    })
})

// import React from "react";
// import "@testing-library/react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import AddTodo from "../../component/AddTodo";

// describe("Testing the Add Todo component", () => {
//   test("render the input and add button", () => {
//     render(<AddTodo onAdd={() => {}} />);
//     expect(screen.getByPlaceholderText("Add a new Todo")).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: "AddTodo" })).toBeInTheDocument(); // "AddTodo" should match the button text
//   });

//   test("When form is submitted, the onAdd function to be invoked", () => {
//     const mockOnAdd = jest.fn();
//     render(<AddTodo onAdd={mockOnAdd} />);

//     const input = screen.getByPlaceholderText("Add a new Todo");
//     const button = screen.getByRole("button", { name: "AddTodo" });

//     // Simulate typing in the input field
//     fireEvent.change(input, { target: { value: "New Todo" } });

//     // Simulate form submission by clicking the button
//     fireEvent.click(button);

//     // Check if the mock function was called with the correct value
//     expect(mockOnAdd).toHaveBeenCalledWith("New Todo");
//   });
// });
