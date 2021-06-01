//TODO: Rename title -> filter?

import 'bootstrap/dist/css/bootstrap.min.css' ;
import './App.css';
import dayjs from 'dayjs' ;
import ToDoNavbar from './NavbarComponents.js' ;
import { ToDoSidebar, ToDoMain } from './MainComponents.js' ;
import {Container, Row} from 'react-bootstrap' ;
import {useState, useEffect} from 'react' ;

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
const t3 = new Task(3, "Read a good book!", true, true) ;

const tl = new TaskList() ;
tl.addTask(t1) ;
tl.addTask(t2) ;
tl.addTask(t3) ;

const filters = ['All', 'Important', 'Today', 'Next 7 Days', 'Private'] ;

function App() {
  //state to manage tasks title
  const [title, setTitle] = useState("All") ;

  //state to manage tasks addition
  const [tasks, setTasks] = useState(tl.tasks) ;

  //state representing max task id
  const [maxId, setMaxId] = useState(Math.max(...tasks.map((task)=> task.id)))

  //function to add a task
  const addTask = (newTask) => {
    const t = new Task(maxId+1, newTask.description, newTask.urgent, newTask.privacy, newTask.deadline)
    setMaxId( oldMaxId => oldMaxId + 1) ;
    setTasks( oldTasks => [...oldTasks, t]) ;
} ;

//function to edit a task
const editTask = (taskId, newDescription, newUrgent , newPrivacy, newDeadline) => {
  setTasks( oldTasks => oldTasks.map( (task) => {
    if (task.id === taskId ) 
      return new Task(taskId, newDescription, newUrgent, newPrivacy, newDeadline) ;
    else return task ;
  })) ;
} ;


//function to remove a task
const removeTask = (taskId) => {
  setTasks( oldTasks => oldTasks.filter( (task) => task.id !== taskId )) ;
} ;
  

  //function to show tasks according to filter
  //(and update tasks title)
  //TODO: warning: it should be 'togglesidebar' and not 'toggleSidebar'

  const manageFilter = (filter) => {
    setTitle(() => filter) ;
  }

  const filterTasks = (oldTasks, filter) => {
    
    switch (filter) {
      case "All":
        return oldTasks ;

      case "Important":
        return oldTasks.filter( task => task.urgent ) ;

      case "Today":
        return oldTasks.filter( (task) => 
        { if (task.deadline === undefined) return false ;
          else return dayjs().isSame(task.deadline, 'day') ;
          }) ; 

      case "Next 7 Days":
        return oldTasks.filter( (task) => 
        { if (task.deadline === undefined) return false ;
          //TODO: 9 ??
          else return task.deadline.isAfter(dayjs(), 'day') && task.deadline.isBefore(dayjs().add(9, 'day'), 'day');
           }) ;

      case "Private":
        return oldTasks.filter( task => task.privacy ) ;
    }
  }

  //state to manage toggle sidebar
  const [collapsed, setCollapsed] = useState(true) ;

  //TODO: warning: it should be 'togglesidebar' and not 'toggleSidebar'
  const toggleSidebar = () => {
    setCollapsed( oldCollapsed => !oldCollapsed ) ;
  } ;

  //callback to reset sidebar (passing from mobile to desktop version)
  useEffect(() => 
                {window.addEventListener('resize', ()=>{if (window.innerWidth > 575) setCollapsed(true)})}
                ) ;

  return (
    <div className="App">
      <ToDoNavbar toggleSidebar={toggleSidebar}></ToDoNavbar>
      <Container fluid>
            <Row className="vheight-100">
              <ToDoSidebar elements={filters} collapsed={collapsed} toggleSidebar={toggleSidebar} title={title} manageFilter={manageFilter} ></ToDoSidebar>
              <ToDoMain title={title} tasks={filterTasks(tasks, title)} addTask={addTask} removeTask={removeTask} editTask={editTask}></ToDoMain>
            </Row>
      </Container>
    </div>
  );
}

export default App;
