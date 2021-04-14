import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ToDoNavbar from './Navbar.js'
import Sidebar from './Sidebar.js';
import Main from './Main.js' ;

function App() {
  return (
    <div className="App">
      <ToDoNavbar></ToDoNavbar>
      <div className="container-fluid">
            <div className="row vheight-100">
              <Sidebar></Sidebar>
              <Main></Main>
            </div>
      </div>
    
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
  </header>*/}
    </div>
  );
}

export default App;
