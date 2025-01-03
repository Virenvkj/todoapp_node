const express = require('express');
const tasks = require('./mock_tasks.json');
const fs = require('fs');

const app = express();
const PORT = 6069;

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

// Create a new task
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;
    const newTaskId = tasks.length + 1;
    tasks.push({ ...newTask, id: newTaskId })
    fs.writeFile('./mock_tasks.json', JSON.stringify(tasks), (err) => {
        console.log(`Error adding new task to the file ${err}`);
    });
    return res.status(201).send({ "msg": `Task ${newTaskId} added successfully`, });

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