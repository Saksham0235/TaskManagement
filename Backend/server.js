const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/Taskmanagement")
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log("Error in connecting with database", e));

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  duedate: { type: Date, default: null }
});

const Task = mongoose.model("Task", TaskSchema);

app.get("/", async (req, res) => {
  res.send("<h1>Hello From Server</h1>");
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  console.log(req.body);
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.get("/tasks/:id", async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(400).json({message:"Task not found"})
        }
        res.json(task);
    }
    catch(error)
    {
        res.status(500).json({message:"Server Error"})
    }
});

app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task Deleted" });
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
