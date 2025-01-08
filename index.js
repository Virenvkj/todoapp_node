const express = require('express');
const tasks = require('./mock_tasks.json');
const fs = require('fs');
const mongoose = require('mongoose');
const { type } = require('os');

const app = express();
const PORT = 6069;

const todoSchema = mongoose.Schema({
    user_name: {
        type: String,
    },
    task_name: {
        type: String,
    },
    completed: {
        type: String,
    },
});

const TodoModel = new mongoose.model('todos', todoSchema);

mongoose.connect('mongodb://127.0.0.1:27017/my-todo')
    .then(() => console.log('Mongo Connected')).catch((err) => console.log('Mongo Error'));

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    const log = `Request recieved ${req.method}-${req.path}-${Date.now().toLocaleString()}\n`;
    fs.appendFile('./log.text', log, (err) => {
        console.log("Something went wrong");
    });
    next();
});

// Routes
app.get('/tasks', (req, res) => {
    const tasksHtml = `
        <ul>${tasks.map((task) => `<li>${task.user_name}</li>`).join('')}</ul>
    `;
    return res.send(tasksHtml);
});


app.post('/api/tasks', async (req, res) => {
    const newTask = TodoModel({
        user_name: req.body.user_name,
        task_name: req.body.task_name,
        completed: req.body.completed,
    });
    await newTask.save();
    return res.status(201).send({ "msg": `Task added successfully`, });
});

// Edit an existing task
app.patch('/api/tasks/:id', (req, res) => {
    const newTask = req.body;
    // Edit the existing json at that id
    // Update the mockData file with new json value
    // Send successful response
});

// Get all the tasks
app.get('/api/tasks', (req, res) => {
    return res.json(tasks);
});

// Get the task with task id
app.get('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find((task) => task.id.toString() === taskId);
    res.send(task);
});

// Listener
app.listen(PORT, () => {
    console.log(`Darshan launched at ${PORT}!`)
})