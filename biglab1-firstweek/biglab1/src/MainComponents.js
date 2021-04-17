//TODO: sistemare 'scorrimento' pagina
import {ListGroup, Col, Form} from 'react-bootstrap' ;
import dayjs from 'dayjs' ;

//Task object constructor
function Task(id, description, urgent = false, privacy = true, deadline = undefined){
    if (!id) throw new Error('ID is required!') ;
    else if (!description) throw new Error('Description is required!') ;
    this.id = id ; 
    this.description = description ;
    this.urgent = urgent ;
    this.privacy = privacy ;
    this.deadline = deadline? dayjs(deadline) : undefined ;
} ;

//TaskList object constructor
function TaskList(){
    this.tasks = [] ;

    //method to add a task to the tasks list
    this.addTask = (task) => this.tasks.push(task) ;
} ;

const t1 = new Task(1, "Complete Lab 2", false, false, "2021-03-22 14:30") ;
const t2 = new Task(2, "Buy some groceries", false, true,  "2021-04-10 11:00") ;
const t3 = new Task(3, "Read a good book!", true, false) ;

const tl = new TaskList() ;
tl.addTask(t1) ;
tl.addTask(t2) ;
tl.addTask(t3) ;

const ToDoSidebar = (props) => {
    const elements = props.elements ;
    const listItems = elements.map( (element) => <ListGroup.Item action href="#" className="sidebar-left-elem" key = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"} id = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"}>{element}</ListGroup.Item>) ;
    // Unshift of 'All' list element that is the active one by default
    listItems.unshift(<ListGroup.Item action href="#" className="sidebar-left-elem sidebar-left-elem-active" key = "all-sidebar" id = "all-sidebar">All</ListGroup.Item>) ;

    return ( 
            <Col sm={4} as="aside" className="collapse d-sm-flex pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left" id="CollapsableSidebar">
                {listItems}        
            </Col> 
            ) ;  
} ;

const FilterTitle = (props) => <h1 className="tasks-title">All</h1> ;

const TaskRow = (props) => {
    return (<ListGroup.Item className="tasklist-elem" key={props.task.id}>
                <div className="d-flex w-100 justify-content-between pt-1">
                    <TaskInfo {...props}/>
                    <TaskControls/>
                </div>
            </ListGroup.Item>) ;
} ;

const TaskInfo = (props) => {
    return (
            <>
            <Form.Label>
                <Form.Check.Input className="me-1" type="checkbox" value=""/>
                {props.task.description}
            </Form.Label>
            {/*if task is private print the icon otherwise don't*/
            props.task.privacy && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
            </svg>)}
            
            {/*if deadline is defined print it otherwise don't*/
            props.task.deadline && <p className="deadline">{props.task.deadline.format("dddd D MMMM YYYY [at] HH:mm")}</p>} 
            </>
            ) ;
} ;

const TaskControls = (props) => {
    return (
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill text-warning" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash text-danger" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </p>
            ) ;
} ;

//Tasks list
const ToDoTaskList = (props) => {
    return (
            <ListGroup as="ul" variant="flush" className="tasklist">
                { props.elements.map( (e) => <TaskRow task={e} key={e.id}/>)}
            </ListGroup>
            ) ;
} ;

const AddButton = (props) => {
    return (
            <a href="#" className="add-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>
            </a>
            ) ;
} ;             

const ToDoMain = (props) => {
    return (
            <Col as='main' xs={12} sm={8}>
                <div id="tasklist-container">
                    <FilterTitle></FilterTitle>   
                    <ToDoTaskList elements={tl.tasks}></ToDoTaskList>
                    <AddButton></AddButton>
                </div>
            </Col>
            ) ;
} ;

export { ToDoSidebar, ToDoMain } ;
