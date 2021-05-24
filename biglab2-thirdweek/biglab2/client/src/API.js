//API to load all the tasks from the db
async function loadTasks(){
    const response = await fetch('/api/tasks') ;
    const fetchedTasks = await response.json() ;
    return fetchedTasks.map( t => ({id: t.id, description: t.description, important: t.important, private: t.private, deadline: t.deadline}) ) ;
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

const API = { loadTasks, addTask } ;
export default API ;