const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sushantsharma:sushant1994@cluster0.pwuas.mongodb.net/mern-todo?retryWrites=true&w=majority");

const TodoModel = require("./models/Todo");

app.get('/todos', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (error) {
        console.log(error);
    }
});

app.post("/todo/new", async (req, res) => {
    try {
        const todo = new TodoModel({
            text: req.body.text,
        });
        await todo.save();
        res.json(todo);
    } catch (error) {
        console.log(error);
    }
})

app.delete("/todo/delete/:id", async (req, res) => {
    try {
        const result = await TodoModel.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

app.get("/todo/complete/:id", async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        todo.complete = !todo.complete;
        todo.save();
        res.json(todo);
    } catch (error) {
        console.log(error);
    }
})

app.listen(5000, () => {
    console.log("Listening on port 5000");
});