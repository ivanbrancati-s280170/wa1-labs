const express = require('express') ;
const morgan = require('morgan') ;
const dao = require('./dao.js') ;
const { body, validationResult } = require('express-validator') ;

const PORT = 3001;

app = new express(); //TODO: why not const app = express() ?

app.use(morgan('dev')) ;
app.use(express.json()) ;

app.get('/', (req,res) => {
    res.send('Server currently active.')
}) ;

//function to retrieve all tasks
app.get('/api/tasks', async (req,res) => {
    try {
        let tasks = await dao.getTasks("All") ;
        res.json(tasks) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

//function to retrieve all tasks with a filter
app.get('/api/tasks/filters/:filter', async (req,res) => {
    const filter = req.params.filter ;
    try {
        let tasks = await dao.getTasks(filter) ;
        res.json(tasks) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

//function to retrieve a task by id
app.get('/api/tasks/:id', async (req,res) => {
    const id = req.params.id ;
    try {
        let task = await dao.getTask(id) ;
        res.json(task) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

//function to create a new task
app.post('/api/tasks', async (req, res) => {
    let description = req.body.description ;
    let important = req.body.important ;
    let privacy = req.body.privacy ;
    let deadline = req.body.deadline ;

    try{
    let lastID = await dao.createTask({description: description, important: important, privacy: privacy, deadline: deadline}) ;
    res.json(lastID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
}) ;
    
//function to create a new task(with validation)
app.post('/api/tasks2',[
    body('description', "Description required!").notEmpty(),
    body('important', "Important should be a Boolean!").isBoolean(),
    body('privacy', "Private should be a Boolean!").isBoolean(),
    body('deadline', "Deadline must be a valid date!").matches(/^\d\d\d\d\/([0-1][0-2])\/([0-2][0-9]|3[0-1])\s([0-1][0-9]|2[0-3]):[0-5]\d$/) 
    ],
    async (req, res) => {
    const errors = validationResult(req) ;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() }) ;
    }
    let description = req.body.description ;
    let important = req.body.important ;
    let privacy = req.body.privacy ;
    let deadline = req.body.deadline ;

    try{
    let lastID = await dao.createTask({description: description, important: important, privacy: privacy, deadline: deadline}) ;
    res.json(lastID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

//function to update an existing task
app.put('/api/tasks/:id', async (req, res) => {
    let id = req.params.id ;
    let description = req.body.description ;
    let important = req.body.important ;
    let privacy = req.body.privacy ;
    let deadline = req.body.deadline ;
    let completed = req.body.completed ;

    try{
    let ID = await dao.updateTask({id: id, description: description, important: important, privacy: privacy, deadline: deadline, completed: completed}) ;
    res.json(ID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

//function to set an existing task as completed/uncompleted
app.put('/api/tasks/toggleCompleted/:id', async (req, res) => {
    let id = req.params.id ;

    try{
    let ID = await dao.toggleCompleted(id) ;
    res.json(ID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

 //function to delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    let id = req.params.id ;

    try{
    let ID = await dao.deleteTask(id) ;
    res.json(ID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));