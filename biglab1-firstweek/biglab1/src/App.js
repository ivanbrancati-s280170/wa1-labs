import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import ToDoNavbar from './NavbarComponents.js' ;
import { ToDoSidebar, ToDoMain } from './MainComponents.js' ;
import {Container, Row} from 'react-bootstrap' ;

function App() {
  const filters = ['Important', 'Today', 'Next 7 Days', 'Private'] ;
  return (
    <div className="App">
      <ToDoNavbar></ToDoNavbar>
      <Container fluid>
            <Row className="vheight-100">
              <ToDoSidebar elements={filters}></ToDoSidebar>
              <ToDoMain></ToDoMain>
            </Row>
      </Container>
    </div>
  );
}

export default App;
