// //Task object constructor
// function Task(id, description, urgent = false, privacy = true, deadline = undefined){
//     if (!id) throw new Error('ID is required!') ;
//     else if (!description) throw new Error('Description is required!') ;
//     this.id = id ; 
//     this.description = description ;
//     this.urgent = urgent ;
//     this.privacy = privacy ;
//     //deadline format: "YYYY-MM-DD hh:mm"
//     this.deadline = deadline? dayjs(deadline) : undefined ;

//     this.toString = () => `Id: ${this.id}, Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.privacy}, Deadline: ${this.deadline?this.deadline.format("MMMM DD, YYYY hh:mmA"):"<not defined>"}`
// } ;

// //TaskList object constructor
// function TaskList(){
//     this.tasks = [] ;

//     //method to add a task to the tasks list
//     this.addTask = (task) => this.tasks.push(task) ;

//     //method to sort tasks by deadline (the ones without deadline will be the last ones)
//     this.sortByDeadline = () => this.tasks.sort((a,b) => {
//         if(a.deadline&&b.deadline) return a.deadline.subtract(b.deadline) ;
//         else if (a.deadline == undefined) return 1 ;
//         else if (b.deadline == undefined) return -1 ;
//         }) ;
        

//     //method to filter only urgent tasks
//     this.filterImportant = () => this.tasks.filter( (task) => task.urgent ) ;

//     //method to filter only private tasks
//     this.filterPrivate = () => this.tasks.filter( (task) => task.privacy ) ;
    
//     //method to filter today tasks
//     this.filterToday = () => this.tasks.filter( (task) => { if (task.deadline == undefined) return false ;
//                                                             else return dayjs().isSame(task.deadline, 'day') ;
//                                                             }) ;

//     //method to filter next 7 days tasks
//     this.filterNext7Days = () => this.tasks.filter( (task) => { if (task.deadline == undefined) return false ;
//                                                            else return task.deadline.isAfter(dayjs(), 'day') && task.deadline.isBefore(dayjs().add(9, 'day'), 'day');
//                                                             }) ;
// } ;

// //creating the tasks
// const t1 = new Task(1, "Play tennis", false , true, "2021-04-04 11:00") ;
// const t2 = new Task(2, "Study", true, false ,  "2020-04-03 15:00") ;
// const t3 = new Task(3, "Gym", true , false, "2021-04-05 20:00") ;
// const t4 = new Task(4, "Complete Lab 3", true , true, "2021-03-29 16:00") ;
// const t5 = new Task(5, "Work meeting", true , true, "2021-05-12 10:00") ;
// const t6 = new Task(6, "Watch a movie", false , false, "2021-04-13 21:00") ;
// const t7 = new Task(7, "Study Again", false, true ,  "2020-04-04 15:00") ;
// const t8 = new Task(8, "Gym Again", true , false, "2021-04-16 13:00") ;
// const t9 = new Task(9, "Supermarket", false , false, "2021-04-12 18:00") ;
// const t10 = new Task(10, "Complete lab 4", true , true, "2021-04-12 16:00") ;
// const t11 = new Task(10, "Read a good book!", true , false) ;


// //creating the task list
// const tl = new TaskList() ;
// tl.addTask(t1) ;
// tl.addTask(t2) ;
// tl.addTask(t3) ;
// tl.addTask(t4) ;
// tl.addTask(t5) ;
// tl.addTask(t6) ;
// tl.addTask(t7) ;
// tl.addTask(t8) ;
// tl.addTask(t9) ;
// tl.addTask(t10) ;
// tl.addTask(t11) ;

//Function to initialize the page content
function initializePage(){
    const tasklistContainer = document.getElementById("tasklist-container") ;
    
    const tasksTitle = document.createElement('h1') ;
    tasksTitle.id = "tasks-title" ;
    tasksTitle.innerText = "All" ;
    
    const taskList = document.createElement('ul') ;
    taskList.classList.add("list-group", "list-group-flush") ;
    taskList.id = "tasklist" ;

    tasklistContainer.appendChild(tasksTitle) ;
    tasklistContainer.appendChild(taskList) ;
} ;

//Function to clear the page content
function clearPage(){
    document.getElementById("tasklist").innerHTML = "" ;
} ;

//Function to update the page content
function updatePage(filterFunction){
    var tasksToPrint ;
    filterFunction == "filterAll" ? tasksToPrint = tl.tasks : tasksToPrint = tl[filterFunction]() ;
    tasksToPrint.forEach( (task) => taskHtmlElement(task)) ;
}

//Function(callback) to get an html element from a task
function taskHtmlElement(task){
    const taskList = document.getElementById("tasklist") ;
    const elemList = document.createElement('li') ;
    elemList.classList.add("list-group-item", "tasklist-elem") ;
    taskList.appendChild(elemList) ;

    const elemDiv = document.createElement('div') ;
    elemDiv.classList.add("d-flex", "w-100", "justify-content-between", "pt-1") ;
    elemList.appendChild(elemDiv) ;

    //task label + checkbox
    const elemCheckBoxLabel = document.createElement('label') ;
    if (task.urgent) elemCheckBoxLabel.classList.add("important-task") ;
    elemCheckBoxLabel.innerHTML = `<input class="form-check-input me-1" type="checkbox" value=""></input>\n${task.description}`
    elemDiv.appendChild(elemCheckBoxLabel) ;

    
    //icon only if the task is private
    if(task.privacy) {
        const elemSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg") ;
        elemSvg.setAttributeNS(null, "width", 20) ;
        elemSvg.setAttributeNS(null, "height", 20) ;
        elemSvg.setAttributeNS(null, "fill", "currentColor") ;
        elemSvg.classList.add("bi", "bi-person-square") ;
        elemSvg.setAttributeNS(null, "viewBox", "0 0 16 16") ;
        const svgPath= document.createElementNS("http://www.w3.org/2000/svg", "path") ;
        svgPath.setAttributeNS(null, "d", "M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z") ;
        const svgPath2= document.createElementNS("http://www.w3.org/2000/svg", "path") ;
        svgPath2.setAttributeNS(null, "d", "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z") ;
        elemSvg.appendChild(svgPath) ;
        elemSvg.appendChild(svgPath2) ;
        elemDiv.appendChild(elemSvg) ;
    } ;

    //deadline
    if(task.deadline) {
                        const elemDeadline = document.createElement("p") ;
                        elemDeadline.classList.add("deadline") ;
                        elemDeadline.innerText = task.deadline.format("dddd D MMMM YYYY [at] HH:mm") ;
                        elemDiv.appendChild(elemDeadline) ;
    } ;
} ;

//Function(callback) for mouse over events
function mouseOver(elem){
                            elem.addEventListener("mouseover", event => {
                                if(document.getElementsByClassName("mouseover").length > 0) Array.from(document.getElementsByClassName("mouseover")).forEach( (elem) => elem.classList.remove("mouseover") ) ;
                                event.target.classList.add("mouseover") ;
                            }) ;
} ;

//Function(callback) for mouse out events
function mouseOut(elem){
    elem.addEventListener("mouseout", event => {
        if(document.getElementsByClassName("mouseover").length > 0) Array.from(document.getElementsByClassName("mouseover")).forEach( (elem) => elem.classList.remove("mouseover") ) ;
    }) ;
} ;

//Function(callback) for click events
function mouseClick(elem){
    elem.addEventListener("click", event => {
        document.getElementById('tasks-title').innerText = event.target.innerText ;
        Array.from(document.getElementsByClassName("sidebar-left-elem-active")).forEach( (elem) => elem.classList.remove("sidebar-left-elem-active")) ;
        document.getElementById(`${event.target.innerText.split(" ").map( (elem) => elem.charAt(0).toLowerCase() + elem.slice(1, elem.length) ).join("_")}-sidebar`).classList.add("sidebar-left-elem-active") ;
        document.getElementById(`${event.target.innerText.split(" ").map( (elem) => elem.charAt(0).toLowerCase() + elem.slice(1, elem.length) ).join("_")}-sidebar-mobile`).classList.add("sidebar-left-elem-active") ;
        clearPage() ;
        updatePage(`filter${event.target.innerText.split(" ").join("")}`) ; 
    }) ;
} ;

//Function for event listeners callbacks after the DOM has been loaded
document.addEventListener('DOMContentLoaded', (event) => {
    initializePage() ;
    
    tl.tasks.forEach( (task) => taskHtmlElement(task) ) ;

    document.querySelectorAll(".mobile-sidebar").forEach( (elem) => mouseOver(elem) ) ;
    document.querySelectorAll(".sidebar-left-elem").forEach( (elem) => mouseOver(elem) ) ;

    document.querySelectorAll(".mobile-sidebar").forEach( (elem) => mouseOut(elem) ) ;
    document.querySelectorAll(".sidebar-left-elem").forEach( (elem) => mouseOut(elem) ) ;

    document.querySelectorAll(".sidebar-left-elem").forEach( (elem) => mouseClick(elem) ) ;
}) ;