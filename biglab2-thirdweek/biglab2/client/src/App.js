
import 'bootstrap/dist/css/bootstrap.min.css' ;
import './App.css';
import dayjs from 'dayjs' ;
import ToDoNavbar from './NavbarComponents.js' ;
import { ToDoSidebar, ToDoMain } from './MainComponents.js' ;
import { Container, Row } from 'react-bootstrap' ;
import { useState, useEffect } from 'react' ;
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom' ;
import confused from './confused.gif'
import API from './API.js'

//TODO: manage filter state when reloading
//TODO: deadline ogni tanto diventa null (?!)

//Task object constructor
function Task(id, description, urgent = false, privacy = true, deadline = undefined, completed = false){
  if (!id) throw new Error('ID is required!') ;
  else if (!description) throw new Error('Description is required!') ;
  this.id = id ; 
  this.description = description ;
  this.urgent = urgent ;
  this.privacy = privacy ;
  this.deadline = deadline? dayjs(deadline) : undefined ;
  this.completed = completed ;
  //TODO: add user
} ;

const filters = ['All', 'Important', 'Today', 'Next 7 Days', 'Private'] ;

function App() {

  //state to manage tasks addition
  const [tasks, setTasks] = useState([]) ;
  //state representing max task id
  const [maxId, setMaxId] = useState('') ;
  //state for task loading at mount time
  const [loading, setLoading] = useState(true) ;
  //state for task updating
  const [updating, setUpdating] = useState(true) ;
  
  //function needed in ToDoMain -> ToDoTaskList -> TaskRow -> TaskInfo
  const updatingPage = () => {
    setUpdating(true) ;
  } ;

  //state to manage tasks filter
  const [filter, setFilter] = useState('All') ;
  
  const changeFilter = (newFilter) => {
    console.log("DEBUG:FILTER CHANGE: "+newFilter) ;
    setFilter( oldFilter => newFilter ) ;
    setUpdating(true) ;
  } ;

  //Rehydrate with all tasks at mount time, when a filter is selected and when a task is added/deleted/updated
  useEffect(() => {
      API.loadTasks(filter).then((retrievedTasks)=> {
        console.log("DEBUG: task reloaded") ;
        setTasks(retrievedTasks.length?retrievedTasks.map( t => new Task(t.id, t.description, t.important, t.private, t.deadline, t.completed)):retrievedTasks) ;
        setLoading(false) ;
        setUpdating(false) ;
      }) ;
      API.retrieveMaxId().then((retrievedId)=> setMaxId(retrievedId.maxid) ) ;
  }, [updating, filter]) ;
  


  //function to add a task
  const addTask = (newTask) => {
    const t = new Task(maxId+1, newTask.description, newTask.urgent, newTask.privacy, newTask.deadline) ;
    API.addTask(t).then(setUpdating(true)) ;
} ;

//function to edit a task
const editTask = (taskId, newDescription, newUrgent , newPrivacy, newDeadline) => {
  API.editTask(taskId, newDescription, newUrgent , newPrivacy, newDeadline).then(setUpdating(true)) ;
} ;


//function to remove a task
const removeTask = (taskId) => {
  API.deleteTask(taskId).then(setUpdating(true)) ;
} ;
  

//state to manage toggle sidebar
const [collapsed, setCollapsed] = useState(true) ;

const toggleSidebar = () => {
  setCollapsed( oldCollapsed => !oldCollapsed ) ;
} ;

//callback to reset sidebar (passing from mobile to desktop version)
useEffect(() => 
{window.addEventListener('resize', ()=>{if (window.innerWidth > 575) setCollapsed(true)})}
) ;

return (
    <Router>
      <div className="App">
        <ToDoNavbar toggleSidebar={toggleSidebar}></ToDoNavbar>
        <Switch>
          <Route exact path='/'>
              <Redirect to='/All'></Redirect>
          </Route>
          <Route path='/:filter'
              children={({match}) => filters.includes(match.params.filter.split(/(?=[A-Z|0-9])/).join(" ")) ? 
                                      ( 
                                        <Container fluid>
                                              <Row className="vheight-100">
                                                <ToDoSidebar elements={filters} collapsed={collapsed} toggleSidebar={toggleSidebar} title={match.params.filter} changeFilter={changeFilter}></ToDoSidebar>
                                                <ToDoMain title={match.params.filter} tasks={tasks} addTask={addTask} removeTask={removeTask} editTask={editTask} loading={loading} updating={updating} updatingPage={updatingPage}></ToDoMain>
                                              </Row>
                                        </Container>
                                      ) :
                                      (
                                        <>
                                          <img src={confused}  className="d-block mx-auto img-fluid w-50"/>
                                          <h1 className='validity-error text-center'>Error!</h1>
                                          <h3 className='text-center'>The page you requested doesn't exist. You will be redirected to the home page in few seconds...</h3>
                                          <p hidden='true'>{setTimeout(() => window.location.replace('/All'), 5000)}</p>
                                        </>
                                      )
                                    }
          /> 
        </Switch>
      </div>
    </Router>
  );
} ;

export default App;
