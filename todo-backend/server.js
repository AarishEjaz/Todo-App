const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Todo = require('./models/todoModel')
const dotenv = require('dotenv').config()
const connectDB = require("./db")
const todoRoutes = require("./routes/todoRoutes")


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())



app.use("/api", todoRoutes);

app.get("/", async(req, res) => {
  const { title } = req.body;
  res.status(200).json({ message: "Hello from json server  " });
});



connectDB();

module.exports = app