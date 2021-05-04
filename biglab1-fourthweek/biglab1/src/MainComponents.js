//TODO: sistemare 'scorrimento' pagina
//TODO: order in states
import { useState } from 'react';
import {ListGroup, Col, Form, Modal, Button} from 'react-bootstrap' ;
import { Link } from 'react-router-dom';
//import dayjs from 'dayjs' ;

const ToDoSidebar = (props) => {
    const elements = props.elements ;
    const listItems = elements.map( (element) => <Link to={`/${element.replaceAll(" ", "")}`} style={{ textDecoration: 'none' }}><ListGroup.Item action href="#" className={`sidebar-left-elem ${props.title === element? "sidebar-left-elem-active": ""}`} key = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"} id = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"} onClick={()=>{
                                                                                                                                                                                                                                                                                                                                                                                                                /*props.manageFilter(element) ;*/
                                                                                                                                                                                                                                                                                                                                                                                                                props.toggleSidebar() ;
                                                                                                                                                                                                                                                                                                                                                                                                            }}>{element}</ListGroup.Item></Link>) ;
    //REMOVED
    // Unshift of 'All' list element that is the active one by default
    //listItems.unshift(<ListGroup.Item action href="#" className="sidebar-left-elem sidebar-left-elem-active" key = "all-sidebar" id = "all-sidebar" tasks={props.tasks} filterTasks={props.filterTasks} onClick={()=>props.filterTasks("All")}>All</ListGroup.Item>) ;

    return ( 
            <Col sm={4} as="aside" style={{textAlign:"left" , backgroundColor:"ghostwhite"}}className={`collapse d-sm-flex pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left ${props.collapsed?"":"show"}`} id="CollapsableSidebar">
                {listItems}        
            </Col> 
            ) ;  
} ;

//TODO: improve this regexp
const FilterTitle = (props) => <h1 className="tasks-title">{props.title.split(/(?=[A-Z])/).join(" ").split(/(?=[0-9])/).join(" ")}</h1> ;

const TaskRow = (props) => {
    return (<ListGroup.Item className="tasklist-elem mylistmain" key={props.task.id}>
                <div className="d-flex w-100 justify-content-between pt-1">
                    <TaskInfo className="d-flex w-75" {...props}/>
                    <div className="d-flex w-25 justify-content-end">
                        <TaskControls id={props.task.id} removeTask={props.removeTask} openModal={props.openModal} handleModalMode={props.handleModalMode} handleToEdit={props.handleToEdit} editTask={props.editTask}/>
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
                {/*TODO: improve editing task*/}
                <svg onClick={()=>{
                                    props.handleModalMode("edit") ;
                                    props.handleToEdit(props.id) ;
                                    props.openModal() ;
                                }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill text-warning" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
                <svg onClick={()=>props.removeTask(props.id)}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash text-danger" viewBox="0 0 16 16">
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
                { props.elements.map( (e) => <TaskRow task={e} key={e.id} removeTask={props.removeTask} openModal={props.openModal} handleModalMode={props.handleModalMode} handleToEdit={props.handleToEdit} editTask={props.editTask}/>)}
            </ListGroup>
            ) ;
} ;

const AddButton = (props) => {
    return (
            <a href="#" className="add-button" onClick={()=>{props.handleModalMode("create"); props.openModal();}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>
            </a>
            ) ;
} ; 

const AddModal = (props) => {
    const [description, setDescription] = useState('') ;
    const [deadlineDate, setDeadlineDate] = useState('') ;
    const [deadlineTime, setDeadlineTime] = useState('') ;
    const [privacy, setPrivacy] = useState(true) ;
    const [urgent, setUrgent] = useState(false) ;
    const [deadlineInput, setDeadlineInput] = useState(false) ;

    //states for validation
    const [descriptionValidity, setDescriptionValidity] = useState(true) ;
    const [deadlineDateValidity, setDeadlineDateValidity] = useState(true) ;
    const [deadlineTimeValidity, setDeadlineTimeValidity] = useState(true) ;

    const handleAdd = () => {
        
        let description_validity = true ;
        let deadlineDate_validity = true ;
        let deadlineTime_validity = true ;

        if(description === '') {
            description_validity = false ;
            setDescriptionValidity(false) ;
        } ;

        if (deadlineInput) {
            if(deadlineDate === ''){ 
                deadlineDate_validity = false ;
                setDeadlineDateValidity(false) ;
            } ;
            if(deadlineTime === ''){
                deadlineTime_validity = false ;
                setDeadlineTimeValidity(false) ;
            } ;
        } ;

        //TODO:VALIDATION
        if (description_validity && deadlineDate_validity && deadlineTime_validity) {
            props.modalMode === "create"? 
            props.addTask({description: description, deadline: deadlineInput && `${deadlineDate} ${deadlineTime}`, privacy:privacy, urgent: urgent}):
            props.editTask(props.taskToEdit.id, description, urgent, privacy, deadlineInput && `${deadlineDate} ${deadlineTime}`) ;
        props.closeModal() ;
        resetForms() ;
        } ;
        
    } ;

    const resetForms = () => {
        setDescription('') ;
        setDeadlineDate('') ;
        setDeadlineTime('') ;
        setPrivacy(true) ;
        setUrgent(false) ;
        setDeadlineInput(false) ;

        setDescriptionValidity(true) ;
        setDeadlineDateValidity(true) ;
        setDeadlineTimeValidity(true) ;
    } ;

    const fillForms = () => {
        //const task = props.taskToEdit ;
        setDescription(props.taskToEdit.description) ;
        if(props.taskToEdit.deadline)
            {
                setDeadlineInput(true) ;
                setDeadlineDate(props.taskToEdit.deadline.format("YYYY-MM-DD")) ;
                setDeadlineTime(props.taskToEdit.deadline.format("HH:mm")) ;
            } 
        else setDeadlineInput(false) ;
        setPrivacy(props.taskToEdit.privacy) ;
        setUrgent(props.taskToEdit.urgent) ;
        
    } ;

    return (
            <Modal /*animation={false}*/ show={props.showModal} /*TODO: correct or not?*/onHide={() => { props.closeModal(); resetForms(); }} onShow={() => props.modalMode === "edit"?fillForms():""}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton /*TODO: correct or not?*/onClick={() => { props.closeModal(); resetForms(); }}>
                    <Modal.Title>{props.modalMode === "create"?"Create a new Task":"Edit Task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="addTaskForm.Description">
                            <Form.Label>Task description</Form.Label>
                            <span className="validity-error" hidden={descriptionValidity}>{descriptionValidity?"":" Description is required!"}</span>
                            <Form.Control value={description} className={descriptionValidity?"":"error-border"} onChange={event => {
                                                                                                                                    setDescription(event.target.value);
                                                                                                                                    setDescriptionValidity(true);
                                                                                                                                    }} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Check>
                                <Form.Check.Input checked={deadlineInput} onChange={event => setDeadlineInput(event.target.checked)} id="deadline" type="checkbox" />
                                <Form.Check.Label htmlFor="deadline">Deadline</Form.Check.Label>
                        </Form.Check>
                        <Form.Row>
                        <Form.Group as={Col} sm={6} controlId="addTaskForm.DeadlineDate">
                            <Form.Control disabled={!deadlineInput} className={deadlineDateValidity?"":"error-border"} value={deadlineDate} onChange={event => {
                                                                                                                                                                setDeadlineDate(event.target.value);
                                                                                                                                                                setDeadlineDateValidity(true);
                                                                                                                                                                    }} type="date" />
                            <span className="validity-error" hidden={deadlineDateValidity}>{deadlineDateValidity?"":"Missing Date!"}</span>                        
                        </Form.Group>
                        <Form.Group as={Col} sm={6} controlId="addTaskForm.DeadlineTime">
                            <Form.Control disabled={!deadlineInput} className={deadlineTimeValidity?"":"error-border"} value={deadlineTime} onChange={event =>  {
                                                                                                                                                                setDeadlineTime(event.target.value);
                                                                                                                                                                setDeadlineTimeValidity(true);
                                                                                                                                                                }} type="time" />
                            <span className="validity-error" hidden={deadlineTimeValidity}>{deadlineTimeValidity?"":"Missing Time!"}</span>                        
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
                                <Form.Check.Input checked={urgent} onChange={event => setUrgent(event.target.checked)} id="important" type="checkbox" />
                                <Form.Check.Label htmlFor="important">Important</Form.Check.Label>
                            </Form.Check>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" /*TODO: correct or not?*/onClick={() => { props.closeModal(); resetForms(); }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd/*props.closeModal*/}>
                        {props.modalMode === "create"?"Create":"Edit"}
                    </Button>
                </Modal.Footer>
        </Modal>
            ) ;
} ; 

const ToDoMain = (props) => {
    //states to manage the modal
    //open/closed 
    const [showModal, setShowModal] = useState(false) ;
    //create/edit
    const [modalMode, setModalMode] = useState('create') ;

    //function to open the modal
    const openModal = () => setShowModal(() => true) ;

    //function to close the modal
    const closeModal = () => setShowModal(() => false) ;

    //function to change the modal mode
    const handleModalMode = (newModalMode) => setModalMode(() => newModalMode) ;

    //state to manage the task to edit 
    const [taskToEdit, setTaskToEdit] = useState('') ;

    //function to set the task to edit
    const handleToEdit = (id) => setTaskToEdit(() => props.tasks.filter((task) => task.id === id)[0]) ;

    return (
            <Col as='main' xs={12} sm={8}>
                <div id="tasklist-container">
                    <FilterTitle title={props.title}></FilterTitle>   
                    <ToDoTaskList elements={props.tasks} removeTask={props.removeTask} openModal={openModal} handleModalMode={handleModalMode} handleToEdit={handleToEdit}></ToDoTaskList>
                    <AddButton showModal={showModal} openModal={openModal} modalMode={modalMode} handleModalMode={handleModalMode}></AddButton>
                    <AddModal showModal={showModal} modalMode={modalMode} closeModal={closeModal} handleModalMode={handleModalMode} addTask={props.addTask} editTask={props.editTask} elements={props.tasks} taskToEdit={taskToEdit}></AddModal>
                </div>
            </Col>
            ) ;
} ;

export { ToDoSidebar, ToDoMain } ;
