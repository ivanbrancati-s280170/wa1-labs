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

    //method to filter only private tasks

    //method to filter today tasks

    //method to filter next 7 days tasks
} ;

//creating the tasks
const t1 = new Task(1, "Play tennis", true , true, "2021-01-12") ;
const t2 = new Task(2, "Study", false, true ,  "2020-04-04") ;
const t3 = new Task(3, "Gym", true , true) ;
const t4 = new Task(4, "prova", true , true) ;
const t5 = new Task(5, undefined, true , true) ;
const t6 = new Task(6, "Play tennis", false , false, "2021-01-12") ;
const t7 = new Task(7, "Study", false, true ,  "2020-04-04") ;
const t8 = new Task(8, "Gym", true , true) ;
const t9 = new Task(9, "prova", true , true) ;
const t10 = new Task(10, undefined, true , true) ;


//creating the task list
const tl = new TaskList() ;
tl.addTask(t1) ;
tl.addTask(t2) ;
tl.addTask(t3) ;
tl.addTask(t4) ;
tl.addTask(t5) ;
tl.addTask(t6) ;
tl.addTask(t7) ;
tl.addTask(t8) ;
tl.addTask(t9) ;
tl.addTask(t10) ;

//Function for event listeners callbacks
document.addEventListener('DOMContentLoaded', (event) => {

}) ;