//API to load all the tasks from the db
async function loadTasks(){
    const response = await fetch('/api/tasks') ;
    const fetchedTasks = await response.json() ;
    return fetchedTasks.map( t => ({id: t.id, description: t.description, important: t.important, private: t.private, deadline: t.deadline, completed: t.completed}) ) ;
  } ;

//API to add a task to the db 
async function addTask(task) {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        "description": task.description, 
        "important": task.urgent, 
        "privacy": task.privacy, 
        "deadline": task.deadline || ''
      } )
    });
    if (response.ok) {
        return null;
    } else return { 'err': 'POST error' };
} ;

//API to delete a task from the db 
//TODO: doesn't work
async function deleteTask(id) {
    const response = await fetch('/api/tasks/:id', 
    {
        method: 'DELETE',
    });
    if (response.ok) {
        return null;
    } else return { 'err': 'DELETE error' };
} ;

//API to retrieve max Task id
async function retrieveMaxId(){
    const response = await fetch('/api/maxtaskid') ;
    const fetchedId = await response.json() ;
    return fetchedId ;
  } ;

const API = { loadTasks, addTask, deleteTask, retrieveMaxId } ;
export default API ;