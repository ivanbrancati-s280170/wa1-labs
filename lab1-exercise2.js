"use strict" ;

const sqlite = require('sqlite3') ;
const dayjs = require('dayjs') ;

//Task object constructor
function Task(id, description, urgent = false, privacy = true, deadline = undefined){
    if (!id) throw new Error('ID is required!') ;
    else if (!description) throw new Error('Description is required!') ;
    this.id = id ; 
    this.description = description ;
    this.urgent = urgent ;
    this.privacy = privacy ;
    this.deadline = deadline? dayjs(deadline) : undefined ;

    this.toString = () => `Id: ${this.id}, Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.privacy}, Deadline: ${this.deadline?this.deadline.format("MMMM DD, YYYY hh:mmA"):"<not defined>"}`
} ;

//TaskList object constructor
function TaskList(){
    this.tasks = [] ;

    //method to add a task to the tasks list
    this.addTask = (task) => this.tasks.push(task) ;

    //method to sort tasks by deadline (the ones without deadline will be the last ones)
    this.sortByDeadline = () => this.tasks.sort((a,b) => {
        if(a.deadline&&b.deadline) return a.deadline.subtract(b.deadline) ;
        else if (a.deadline == undefined) return 1 ;
        else if (b.deadline == undefined) return -1 ;
        }) ;
        

    //method to filter only urgent tasks
    this.filterUrgent = () => this.tasks.filter( (task) => task.urgent )

    //method to print sorted tasks
    this.sortAndPrint = () => {
    const printList = this.sortByDeadline().map( (task) => task.toString()) ;
    printList.unshift("****** Tasks sorted by deadline (most recent first): ******") ;
    console.log(printList.join("\n")) ;
    } ;

    //method to print urgent tasks
    this.filterAndPrint = () => {
        const printList = this.filterUrgent().map( (task) => task.toString()) ;
        printList.unshift("****** Tasks filtered, only (urgent == true): ******") ;
        console.log(printList.join("\n")) ;
        } ;
    } ;

//TODO: change db access and methods
//open db
const db = new sqlite.Database( 'tasks.db',
(err) => { if(err) throw err; }) ;

//function that returns all the tasks in the db
function getAll() {
    return new Promise( (resolve, reject) => {
        db.all("SELECT * FROM tasks", 
            (err, rows) => {
                if (err) reject (err) ;
                else {
                    resolve(rows);
                } ;
                }) ;
    }) ;
} ;

//function that returns the tasks in the db with the deadline after a certain date
function getAfterDate(date) {
    return new Promise( (resolve, reject) => {
        db.all("SELECT * FROM tasks WHERE deadline > ?",[date], 
            (err, rows) => {
                if (err) reject (err) ;
                else {
                    resolve(rows);
                } ;
                }) ;
    }) ;
} ;

//function that returns the tasks in the db with the description with a certain word
function getFromDescription(word) {
    return new Promise( (resolve, reject) => {
        db.all("SELECT * FROM tasks WHERE description LIKE ?",[`%${word}%`], 
            (err, rows) => {
                if (err) reject (err) ;
                else {
                    resolve(rows);
                } ;
                }) ;
    }) ;
} ;

//function to add tasks to the task list
//select is the function to get the tasks
//parameters are the (optional) parameters to give to the select function
async function addFromDb(tasklist, select, parameters) {
    const DBtasks = await select(parameters) ;
    DBtasks.forEach( (task) => tasklist.addTask(new Task(task.id, task.description, task.urgent, task.privacy, task.deadline))) ;
    tasklist.sortAndPrint() ;
} ;






const tl = new TaskList() ; 
//addFromDb(tl, getAll) ;
//addFromDb(tl, getAfterDate, "2020-11-11") ;
//addFromDb(tl, getFromDescription, "lab") ;

