import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ToDoNavbar from './ToDoNavbar.js'
import ToDoSidebar from './ToDoSidebar.js';
import Main from './Main.js' ;
import {Container, Row} from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <ToDoNavbar></ToDoNavbar>
      <Container fluid>
            <Row className="vheight-100">
              <ToDoSidebar></ToDoSidebar>
              <Main></Main>
            </Row>
      </Container>
    </div>
  );
}

export default App;
