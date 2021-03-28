//Task object constructor
function Task(id, description, urgent = false, privacy = true, deadline = undefined){
    if (!id) throw new Error('ID is required!') ;
    else if (!description) throw new Error('Description is required!') ;
    this.id = id ; 
    this.description = description ;
    this.urgent = urgent ;
    this.privacy = privacy ;
    //deadline format: "YYYY-MM-DD hh:mm"
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
    this.filterUrgent = () => this.tasks.filter( (task) => task.urgent ) ;

    //method to filter only private tasks
    this.filterPrivate = () => this.tasks.filter( (task) => task.privacy ) ;
    
    //method to filter today tasks
    this.filterToday = () => this.tasks.filter( (task) => { if (task.deadline == undefined) return false ;
                                                            else return dayjs().isSame(task.deadline, 'day') ;
                                                            }) ;

    //method to filter next 7 days tasks
    this.filterWeek = () => this.tasks.filter( (task) => { if (task.deadline == undefined) return false ;
                                                           else return task.deadline.isAfter(dayjs(), 'day') && task.deadline.isBefore(dayjs().add(9, 'day'), 'day');
                                                            }) ;
} ;

//creating the tasks
const t1 = new Task(1, "Play tennis", false , true, "2021-04-04 11:00") ;
const t2 = new Task(2, "Study", true, false ,  "2020-04-03 15:00") ;
const t3 = new Task(3, "Gym", true , false, "2021-04-05 20:00") ;
const t4 = new Task(4, "Complete Lab 3", true , true, "2021-03-29 16:00") ;
const t5 = new Task(5, "Work meeting", true , true, "2021-05-12 10:00") ;
const t6 = new Task(6, "Watch a movie", false , false, "2021-04-13 21:00") ;
const t7 = new Task(7, "Study Again", false, true ,  "2020-04-04 15:00") ;
const t8 = new Task(8, "Gym Again", true , false, "2021-04-16 13:00") ;
const t9 = new Task(9, "Supermarket", false , false, "2021-04-12 18:00") ;
const t10 = new Task(10, "Complete lab 4", true , true, "2021-04-12 16:00") ;
const t11 = new Task(10, "Read a good book!", true , false) ;


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
tl.addTask(t11) ;

//TODO: continua da qui
/* //Function to get an html element from a task
function taskHtmlElement(task){
    const taskElem = document.createElement()
} */
//Function for event listeners callbacks
document.addEventListener('DOMContentLoaded', (event) => {
    const tasklistContainer = document.getElementById("tasklist-container") ;
    const tasksTitle = document.createElement('h1') ;
    tasksTitle.id = "tasks-title" ;
    tasksTitle.innerText = "All" ;
    tasklistContainer.appendChild(tasksTitle) ;
/*     tl.tasks.forEach( (task) => {

        tasklistContainer.appendChild
    }) ; */
}) ;