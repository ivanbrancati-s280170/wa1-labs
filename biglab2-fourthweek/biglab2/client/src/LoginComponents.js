import { Container, Row, Button, Modal, Nav, Form, InputGroup } from 'react-bootstrap' ;
import { useState } from 'react' ;

const LoginPage = (props) => {
    // state to manage modal opening
    const [modalShow, setModalShow] = useState(false);

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <div className="login-logo mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-check2-all mx-auto" viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                    <h1>ToDo Manager</h1>
                </div>
            </Row>
            <Button onClick={()=> setModalShow(true)} variant="info" size="lg" block>Sign Into ToDo Manager</Button>
            <Button variant="secondary" size="lg" block>Create a new Account</Button>
            <LoginModal login={props.login} show={modalShow}
            onHide={() => setModalShow(false)}/>
        </Container>
    )
} ;

const LoginModal = (props) => {
    // states to manage the login form
    const [username, setUsername] = useState('') ;
    const [password, setPassword] = useState('') ;

    const handleLogin = () => {
        //TODO: validation
        const credentials = { username, password } ;
        props.login(credentials) ;
    } ;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
        <Row>
        <button type="button" className="close" onClick={props.onHide}>
            <span>×</span>
        </button>
       </Row>
        <Modal.Title as="h1" className="login-modal-text w-100" id="contained-modal-title-vcenter">
        Sign In
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group >
        <InputGroup>
        <InputGroup.Prepend>
            <InputGroup.Text>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
            placeholder="E-mail"
            aria-label="E-mail"
            aria-describedby="basic-addon1"
            className="form-control-lg"
            value = {username}
            onChange = {event => setUsername(event.target.value)}
        />
        </InputGroup>
        </Form.Group>
        <Form.Group>
        <InputGroup>
        <InputGroup.Prepend>
            <InputGroup.Text>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
            </svg>
            </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
        type="password"
        placeholder="Password"
        aria-label="Password"
        aria-describedby="basic-addon1"
        className="form-control-lg"
        value = {password}
        onChange = {event => setPassword(event.target.value)}
        /> 
        </InputGroup>    
        </Form.Group>
        <Form.Group>
        <Button variant="success" size="lg" block onClick={handleLogin()}>Login{/*TODO: migliora*/}</Button>    
        <Nav.Link className="h5 login-modal-text w-100 forgot">Forgot Password?</Nav.Link>
        </Form.Group>
        </Form> 
        </Modal.Body>
        <Modal.Footer >
            <div as="h5" className="login-modal-text w-100">
                Don't have an account? <Nav.Link className="h4">Sign Up</Nav.Link>
            </div>
        </Modal.Footer>
      </Modal>
    );
};

export {LoginPage} ;