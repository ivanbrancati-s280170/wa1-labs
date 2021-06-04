const express = require('express') ;
const morgan = require('morgan') ;
const tasksDao = require('./tasks-dao.js') ;
const { body, validationResult } = require('express-validator') ;

const passport = require('passport') ;
const passportLocal = require('passport-local') ;

//TODO: 0/1 anzichè true/false

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
        let tasks = await tasksDao.getTasks("All") ;
        res.json(tasks) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

//function to retrieve all tasks with a filter
app.get('/api/tasks/filters/:filter', async (req,res) => {
    const filter = req.params.filter ;
    try {
        let tasks = await tasksDao.getTasks(filter) ;
        res.json(tasks) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

//function to retrieve a task by id
app.get('/api/tasks/:id', async (req,res) => {
    const id = req.params.id ;
    try {
        let task = await tasksDao.getTask(id) ;
        res.json(task) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

//function to create a new task
//OLD
/*
app.post('/api/tasks', async (req, res) => {
    let description = req.body.description ;
    let important = req.body.important ;
    let privacy = req.body.privacy ;
    let deadline = req.body.deadline ;

    try{
    let lastID = await tasksDao.createTask({description: description, important: important, privacy: privacy, deadline: deadline}) ;
    res.json(lastID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
}) ;
*/
    
//function to create a new task(with validation)
app.post('/api/tasks',[
    body('description', "Description required!").notEmpty(),
    body('important', "Important should be a Boolean!").isBoolean(),
    body('privacy', "Private should be a Boolean!").isBoolean(),
    body('deadline', "Deadline must be a valid date('YYYY-MM-DD HH:mm' or empty!").matches(/^\d\d\d\d\-([0]\d|[0-1][0-2])\-([0-2][0-9]|3[0-1])\s([0-1][0-9]|2[0-3]):[0-5]\d|^$/) 
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
    let lastID = await tasksDao.createTask({description: description, important: important, privacy: privacy, deadline: deadline}) ;
    res.json(lastID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

//function to update an existing task
app.put('/api/tasks/:id',[
    body('description', "Description required!").notEmpty(),
    body('important', "Important should be a Boolean!").isBoolean(),
    body('privacy', "Private should be a Boolean!").isBoolean(),
    body('deadline', "Deadline must be a valid date!(YYYY-MM-DD HH:mm)").matches(/^\d\d\d\d\-([0]\d|[0-1][0-2])\-([0-2][0-9]|3[0-1])\s([0-1][0-9]|2[0-3]):[0-5]\d|^$/) 
    ], async (req, res) => {
    const errors = validationResult(req) ;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() }) ;
    }
    let id = req.params.id ;
    let description = req.body.description ;
    let important = req.body.important ;
    let privacy = req.body.privacy ;
    let deadline = req.body.deadline ;
    //let completed = 0 ;

    try{
    let ID = await tasksDao.updateTask({id: id, description: description, important: important, privacy: privacy, deadline: deadline}) ;
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
    let ID = await tasksDao.toggleCompleted(id) ;
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
    let ID = await tasksDao.deleteTask(id) ;
    res.json(ID) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

 //function to retrieve max task id
app.get('/api/maxtaskid', async (req,res) => {
    try {
        let result = await tasksDao.getMaxId() ;
        res.json(result) ;
        } catch(error) {
            res.status(500).json(error) ;
        }
}) ;

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));