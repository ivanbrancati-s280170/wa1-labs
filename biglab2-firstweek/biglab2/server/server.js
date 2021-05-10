const express = require('express') ;
const morgan = require('morgan') ;
const dao = require('./dao.js')

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
app.post('/api/exams', async (req, res) => {
    let code = req.body.code ;
    let score = req.body.scre ;
    let date = req.body.date ;

    try{
    await dao.createExam({code:code, score:score, date:date}) ;
    res.end() ;
    } catch(error) {
        res.status(500).json(error) ;
    }
 }) ;

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));