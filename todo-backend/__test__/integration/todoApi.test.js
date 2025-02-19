const request  = require("supertest")

const{MongoMemoryServer} = require("mongodb-memory-server")
const mongoose = require("mongoose")

const app = require("../../server")

const Todo = require("../../models/todoModel")

describe("todo API integration test",(req,res)=>{

    let mongoServer;

    beforeAll(async()=>{
        mongoServer = await MongoMemoryServer.create()
        const mongoUri = mongoServer.getUri()
        await mongoose.disconnect()
        await mongoose.connect(mongoUri)
    })

    afterAll(async()=>{
        await mongoose.disconnect()
        await mongoServer.stop()
    })

    describe("GET /api/get-todo", ()=>{
        // jest.setTimeout(30000);  add this if you are facing timeout error

        it("should return all the todos", async()=>{

            await Todo.create({title:"Todo 1"})
            await Todo.create({title:"Todo 2"})

            const response = await request(app).get("/api/get-todo")

            // console.log("response is", response)
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(2)
            expect(response.body[0].title).toBe("Todo 1")
            expect(response.body[1].title).toBe("Todo 2");
        })
    })

    describe("POST /api/add-todo",()=>{
        it("should create a new todo",async()=>{
            // jest.setTimeout(30000);
            const response = await request(app).post("/api/add-todo").send({title:"New Todo"})

            console.log("response is", response.body)
            expect(response.status).toBe(200)
            expect(response.body.title).toBe("New Todo")
            expect(response.body.completed).toBe(false)

            const todo = await Todo.findById(response.body._id)
            console.log("response is ", todo)
            expect(todo).toBeTruthy()
            expect(todo.title).toBe("New Todo")

        })
    })
})
