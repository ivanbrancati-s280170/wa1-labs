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