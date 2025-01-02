const express = require('express');
const tasks = require('./mock_tasks.json');

const app = express();
const PORT = 6069;

// Routes
app.get('/tasks', (req, res) => {
    const tasksHtml = `
        <ul>${tasks.map((task) => `<li>${task.user_name}</li>`).join('')}</ul>
    `;
    return res.send(tasksHtml);
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
    console.log("Darshan launched !")
})