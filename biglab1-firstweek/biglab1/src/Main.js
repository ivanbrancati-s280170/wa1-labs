//TODO: creare list con keys (vedi funzione numberlist)
//TODO: sistemare 'scorrimento' pagina
import {ListGroup} from 'react-bootstrap' ;
const Title = (props) => <h1 className="tasks-title">All</h1> ;

const TaskList = (props) => {
    return (
            <ListGroup as="ul" variant="flush" className="tasklist">
                <ListGroup.Item className="tasklist-elem">
                    <div className="d-flex w-100 justify-content-between pt-1">
                        <label>
                            <input className="form-check-input me-1" type="checkbox" value=""/>
                            Complete Lab 2
                        </label>
                        <p className="deadline">Monday 22 March at 14:30</p>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item className="tasklist-elem">
                    <div className="d-flex w-100 justify-content-between pt-1">
                        <label>
                            <input className="form-check-input me-1" type="checkbox" value=""/>
                            Buy some groceries
                        </label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                        </svg>
                        <p className="deadline">Today at 14:00</p>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item className="tasklist-elem">
                    <div className="d-flex w-100 justify-content-between pt-1">
                        <label className="important-task">
                            <input className="form-check-input me-1" type="checkbox" value=""/>
                            Read a good book!
                        </label>
                    </div>
                </ListGroup.Item>
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

const Main = (props) => {
    return (
            <main className="col-12 col-sm-8">
                <div id="tasklist-container">
                    <Title></Title>   
                    <TaskList></TaskList>
                    <AddButton></AddButton>
                </div>
            </main>
            ) ;
} ;

export default Main ;
