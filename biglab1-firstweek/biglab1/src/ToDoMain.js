//TODO: creare list con keys (vedi funzione numberlist) / sistema todotasklist2
//TODO: sistemare 'scorrimento' pagina
import {ListGroup, Col, Form} from 'react-bootstrap' ;

//Task object constructor
function Task(id, description, urgent = false, privacy = true, deadline = undefined){
    if (!id) throw new Error('ID is required!') ;
    else if (!description) throw new Error('Description is required!') ;
    this.id = id ; 
    this.description = description ;
    this.urgent = urgent ;
    this.privacy = privacy ;
    //deadline as a string for now
    //this.deadline = deadline? dayjs(deadline) : undefined ;
} ;

//TaskList object constructor
function TaskList(){
    this.tasks = [] ;

    //method to add a task to the tasks list
    this.addTask = (task) => this.tasks.push(task) ;
} ;

const t1 = new Task(1, "Complete Lab 2", false, false, "Monday 22 March at 14:30") ;
const t2 = new Task(2, "Buy some groceries", false, true,  "Today at 14:00") ;
const t3 = new Task(3, "Read a good book!", true, false) ;

const tl = new TaskList() ;
tl.addTask(t1) ;
tl.addTask(t2) ;
tl.addTask(t3) ;

const ToDoTitle = (props) => <h1 className="tasks-title">All</h1> ;

const ToDoTaskListElements = (props) => {
    const elements = props.elements ;
    const taskItems = elements.map( (element) =>  { 
        return (<ListGroup.Item className="tasklist-elem">
                <div className="d-flex w-100 justify-content-between pt-1">
                    <Form.Label>
                        <Form.Check.Input className="me-1" type="checkbox" value=""/>
                        {element.description}
                    </Form.Label>
                    {/*if task is private print the icon otherwise don't*/
                    element.privacy && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                    </svg>)}
                    
                    {/*if deadline is defined print it otherwise don't*/
                    element.deadline && <p className="deadline">{element.deadline}</p>} 
                </div>
                </ListGroup.Item>)
                }) ;
    return taskItems ;
} ;

const ToDoTaskList = (props) => {
    return (
            <ListGroup as="ul" variant="flush" className="tasklist">
                <ListGroup.Item className="tasklist-elem">
                    <div className="d-flex w-100 justify-content-between pt-1">
                        <Form.Label>
                            <Form.Check.Input className="me-1" type="checkbox" value=""/>
                            Complete Lab 2
                        </Form.Label>
                        <p className="deadline">Monday 22 March at 14:30</p>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item className="tasklist-elem">
                    <div className="d-flex w-100 justify-content-between pt-1">
                        <Form.Label>
                            <Form.Check.Input className="me-1" type="checkbox" value=""/>
                            Buy some groceries
                        </Form.Label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                        </svg>
                        <p className="deadline">Today at 14:00</p>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item className="tasklist-elem">
                    <div className="d-flex w-100 justify-content-between pt-1">
                        <Form.Label className="important-task">
                            <Form.Check.Input className="me-1" type="checkbox" value=""/>
                            Read a good book!
                        </Form.Label>
                    </div>
                </ListGroup.Item>
            </ListGroup>
            ) ;
} ;

const ToDoTaskList2 = (props) => {
    return (
            <ListGroup as="ul" variant="flush" className="tasklist">
               <ToDoTaskListElements elements = {tl}/>
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
            <Col as='main' xs={12} md={8}>
                <div id="tasklist-container">
                    <ToDoTitle></ToDoTitle>   
                    <ToDoTaskList></ToDoTaskList>
                    <AddButton></AddButton>
                </div>
            </Col>
            ) ;
} ;

export default ToDoMain ;
