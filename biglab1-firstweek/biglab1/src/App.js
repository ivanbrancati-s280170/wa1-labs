//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Navbar.js'
import Sidebar from './Sidebar.js';
import Main from './Main.js' ;
import AddButton from './AddButton.js' ;

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="container-fluid">
            <div className="row">
              <Sidebar></Sidebar>
              <Main></Main>
              <AddButton></AddButton>
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
