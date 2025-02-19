const { describe } = require("node:test")
const todoController = require("../../controllers/todoController")

jest.mock("../../models/todoModel.js")

const mockSave = jest.fn()
const mockAdd = jest.fn()
const mockFind = jest.fn()

const Todo = require("../../models/todoModel")

Todo.find  = mockFind
Todo.mockImplementation(()=>({
  save: mockSave
}))
Todo.save = mockSave

describe("When todo controller is invoked,",()=>{
  let req,res;

  beforeEach(()=>{
    (req = {
      body: {},
      params: {},
    }),
      (res = {
        json: jest.fn(() => res),
        status: jest.fn(() => res),
      });
  })


  describe("For getTodos function",()=>{
    it("If every thing goes right should return me all todos",async()=>{
      const mockTodos = [
        { _id: 0, title: "Todo 1", completed: false },
        { _id: 1, title: "Todo 2", completed: false },
        { _id: 2, title: "Todo 3", completed: false },
      ];
      mockFind.mockResolvedValue(mockTodos)
      await todoController.getTodos(req,res)

      expect(mockFind).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockTodos)
    })

     it("if something goes wrong, it should handle errors", async()=>{

      const errorMessage = "something went wrong, please try later";
      mockFind.mockRejectedValue(new Error(errorMessage))

      await todoController.getTodos(req,res)
      expect(mockFind).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({message:errorMessage})

     })
  })

  describe("For add todo Function", ()=>{
    it("should create a new Todo",async()=>{
      const newTodo = {_id:"1",title:"New Todo"}
      req.body ={title:"New todo"}
      mockSave.mockResolvedValue(newTodo)

      await todoController.addTodos(req,res)

      expect(mockSave).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(newTodo)
    })

    it("should handle the erros",async()=>{
      const errorMessage = "something went wrong";
      mockSave.mockRejectedValue(new Error(errorMessage));

      await todoController.addTodos(req, res);
      expect(mockSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    })

  })

})
