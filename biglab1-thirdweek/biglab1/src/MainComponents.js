//TODO: sistemare 'scorrimento' pagina
import { useState } from 'react';
import {ListGroup, Col, Form, Modal, Button} from 'react-bootstrap' ;
//import dayjs from 'dayjs' ;

const ToDoSidebar = (props) => {
    const elements = props.elements ;
    const listItems = elements.map( (element) => <ListGroup.Item action href="#" className={`sidebar-left-elem ${props.title === element? "sidebar-left-elem-active": ""}`} key = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"} id = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"} onClick={()=>props.manageFilter(element)}>{element}</ListGroup.Item>) ;
    //REMOVED
    // Unshift of 'All' list element that is the active one by default
    //listItems.unshift(<ListGroup.Item action href="#" className="sidebar-left-elem sidebar-left-elem-active" key = "all-sidebar" id = "all-sidebar" tasks={props.tasks} filterTasks={props.filterTasks} onClick={()=>props.filterTasks("All")}>All</ListGroup.Item>) ;

    return ( 
            <Col sm={4} as="aside" style={{textAlign:"left" , backgroundColor:"ghostwhite"}}className={`collapse d-sm-flex pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left ${props.collapsed?"":"show"}`} id="CollapsableSidebar">
                {listItems}        
            </Col> 
            ) ;  
} ;

const FilterTitle = (props) => <h1 className="tasks-title">{props.title}</h1> ;

const TaskRow = (props) => {
    return (<ListGroup.Item className="tasklist-elem mylistmain" key={props.task.id}>
                <div className="d-flex w-100 justify-content-between pt-1">
                    <TaskInfo className="d-flex w-75" {...props}/>

                    <div className="d-flex w-25 justify-content-end">
                    <TaskControls/>
                    </div>
                </div>
            </ListGroup.Item>) ;
} ;

const TaskInfo = (props) => {
    return (
            <>
            <Form.Check className='d-flex w-50 justify-content-start'>
                <Form.Check.Input className="me-1"  type="checkbox" value=""/>
                    <Form.Label className={
                    /*if task is important make it red otherwise don't*/
                    props.task.urgent?"important-task ":""}
                    >
                        <strong>{props.task.description}</strong>
                    </Form.Label>
                </Form.Check>
          
          <div className='d-flex w-50'>
            
            <div className='d-flex w-25'>
           { /*if task is private print the icon otherwise don't*/
           props.task.privacy && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" bi bi-person-square" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
            </svg>)
            
            }
            </div>
            <div className="d-flex w-75 ">
            {/*if deadline is defined print it otherwise don't*/
            props.task.deadline && <p className="deadline">{props.task.deadline.format("dddd D MMMM YYYY [at] HH:mm")}</p>} 
            </div>
            </div>
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
            <a href="#" className="add-button" onClick={props.openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>
            </a>
            ) ;
} ; 

const AddModal = (props) => {
    const [description, setDescription] = useState('') ;
    const [deadlineDate, setDeadlineDate] = useState(undefined) ;
    const [deadlineTime, setDeadlineTime] = useState(undefined) ;
    const [privacy, setPrivacy] = useState(true) ;
    const [important, setImportant] = useState(false) ;
    const [deadlineInput, setDeadlineInput] = useState(false) ;

    const handleAdd = () => {
        //TODO:VALIDATION
        const new_task = {description: description, deadline: deadlineInput && `${deadlineDate} ${deadlineTime}`, privacy:privacy, urgent: important}
        props.addTask(new_task) ;
        props.closeModal() ;
        resetForms() ;
        
    } ;

    const resetForms = () => {
        setDescription('') ;
        setDeadlineDate(undefined) ;
        setDeadlineTime(undefined) ;
        setPrivacy(true) ;
        setImportant(false) ;
        setDeadlineInput(false) ;
    } ;

    return (
            <Modal /*animation={false}*/ show={props.showModal} onHide={props.closeModal} 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton /*TODO: correct or not?*/onClick={() => {resetForms(); props.closeModal();}}>
                    <Modal.Title>Create a new Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addTaskForm.Description">
                            <Form.Label>Task description</Form.Label>
                            <Form.Control value={description} onChange={event => setDescription(event.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Check>
                                <Form.Check.Input checked={deadlineInput} onChange={event => setDeadlineInput(event.target.checked)} id="deadline" type="checkbox" />
                                <Form.Check.Label htmlFor="deadline">Deadline</Form.Check.Label>
                        </Form.Check>
                        <Form.Row>
                        <Form.Group as={Col} sm={6} controlId="addTaskForm.DeadlineDate">
                            <Form.Control disabled={!deadlineInput} value={deadlineDate} onChange={event => setDeadlineDate(event.target.value)} type="date" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group as={Col} sm={6} controlId="addTaskForm.DeadlineTime">
                            <Form.Control disabled={!deadlineInput} value={deadlineTime} onChange={event => setDeadlineTime(event.target.value)} type="time" placeholder="name@example.com" />
                        </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm={6}>
                            <Form.Check>
                                <Form.Check.Input checked={privacy} onChange={event => setPrivacy(event.target.checked)} id="private" type="checkbox" />
                                <Form.Check.Label htmlFor="private">Private</Form.Check.Label>
                            </Form.Check>
                            </Form.Group>
                            <Form.Group as={Col} sm={6}>
                            <Form.Check>
                                <Form.Check.Input checked={important} onChange={event => setImportant(event.target.checked)} id="important" type="checkbox" />
                                <Form.Check.Label htmlFor="important">Important</Form.Check.Label>
                            </Form.Check>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" /*TODO: correct or not?*/onClick={() => {resetForms(); props.closeModal();}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd/*props.closeModal*/}>
                        Create
                    </Button>
                </Modal.Footer>
        </Modal>
            ) ;
} ; 

const ToDoMain = (props) => {
    //state to manage the modal 
    const [showModal, setShowModal] = useState(false) ;

    //function to open the modal
    const openModal = () => setShowModal(() => true) ;

    //function to close the modal
    const closeModal = () => setShowModal(() => false) ;


    return (
            <Col as='main' xs={12} sm={8}>
                <div id="tasklist-container">
                    <FilterTitle title={props.title}></FilterTitle>   
                    <ToDoTaskList elements={props.tasks}></ToDoTaskList>
                    <AddButton showModal={showModal} openModal={openModal}></AddButton>
                    <AddModal showModal={showModal} closeModal={closeModal} addTask={props.addTask}></AddModal>
                </div>
            </Col>
            ) ;
} ;

export { ToDoSidebar, ToDoMain } ;
