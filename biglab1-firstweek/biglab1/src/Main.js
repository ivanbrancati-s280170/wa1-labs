//TODO: sistemare versione doppie -> versione singola
//TODO: creare list con keys (vedi funzione numberlist)
//TODO: sistemare 'scorrimento' pagina
const Title = (props) => <h1 className="tasks-title">All</h1> ;

const TaskList = (props) => {
    return (
            <ul className="list-group list-group-flush tasklist">
                <li className="list-group-item tasklist-elem">
                    <div className="d-flex w-100 justify-content-between pt-1">
                        <label >
                            <input className="form-check-input me-1" type="checkbox" value=""/>
                            Complete Lab 2
                        </label>
                        <p className="deadline">Monday 22 March at 14:30</p>
                    </div>
                </li>
                <li className="list-group-item tasklist-elem">
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
                </li>
                <li className="list-group-item tasklist-elem">
                    <div className="d-flex w-100 justify-content-between pt-1">
                        <label className="important-task">
                            <input className="form-check-input me-1" type="checkbox" value=""/>
                            Read a good book!
                        </label>
                    </div>
                </li>
            </ul>
            ) ;
} ;

const Main = (props) => {
    return (
            <main className="col-sm-8">
                <Title></Title>   
                <TaskList></TaskList>
            </main>
            ) ;
} ;

/*<main class="col-sm-8">
                    <h1 class="tasks-title">All</h1>
                        <ul class="list-group list-group-flush tasklist">
                            <li class="list-group-item tasklist-elem">
                                <div class="d-flex w-100 justify-content-between pt-1">
                                    <label >
                                        <input class="form-check-input me-1" type="checkbox" value="">
                                        Complete Lab 2
                                    </label>
                                    <p class="deadline">Monday 22 March at 14:30</p>
                                </div>
                            </li>
                            <li class="list-group-item tasklist-elem">
                                <div class="d-flex w-100 justify-content-between pt-1">
                                    <label>
                                        <input class="form-check-input me-1" type="checkbox" value="">
                                        Buy some groceries
                                    </label>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                                    </svg>
                                    <p class="deadline">Today at 14:00</p>
                                </div>
                            </li>
                            <li class="list-group-item tasklist-elem">
                                <div class="d-flex w-100 justify-content-between pt-1">
                                    <label class="important-task">
                                        <input class="form-check-input me-1" type="checkbox" value="">
                                        Read a good book!
                                    </label>
                                </div>
                            </li>
                        </ul>
                </main>*/

export default Main ;
