import { Container, Row, Button, Modal, Nav, Form, InputGroup } from 'react-bootstrap' ;
import { useState } from 'react' ;

const LoginPage = (props) => {
    // state to manage modal opening
    const [modalShow, setModalShow] = useState(false);

    const hideModal = () => {
        setModalShow(false) ;
    }

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
            <LoginModal login={props.login} show={modalShow} hideModal={hideModal}
            onHide={() => setModalShow(false)}/>
        </Container>
    )
} ;

const LoginModal = (props) => {
    
    // states for input fields
    const [username, setUsername] = useState('') ;
    const [password, setPassword] = useState('') ;

    // states for validation(and error messages)
    const [usernameValidity, setUsernameValidity] = useState(true) ;
    const [passwordValidity, setPasswordValidity] = useState(true) ;

    // state to manage the login error message
    const [wrongLogin, setWrongLogin] = useState(false) ;

    
    // function to check if the email is in a valid form
    const validateMail = (email) => {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) ;
    } ;
    
    // function to handle login (with validation)
    const handleLogin = () => {
        let username_validity = true ;
        let password_validity = true ;
        
        if(username === '' || !validateMail(username)) {
            username_validity = false ;
            setUsernameValidity(false) ;
        } ;

        if(password === '' || password.length < 8) {
            password_validity = false ;
            setPasswordValidity(false) ;
        } ;

        if (username_validity && password_validity) {
        const credentials = { username, password } ;
        const loginResult = props.login(credentials)
        .then(
        (loginResult) => {
        if (loginResult) 
            setWrongLogin(true) ;
        } ) ;
        } ;
    } ;

    // function to reset form fields
    const resetForms = () => {
        setUsername('') ;
        setUsernameValidity(true) ;
        setPassword('') ;
        setPasswordValidity(true) ;
        setWrongLogin(false) ;
    } ;

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide = {() => {
                            resetForms() ;
                            props.hideModal() ;
                        }}
      >
        <Modal.Header>
        <Row>
        <button type="button" className="close align-items-end" onClick={() => {props.onHide() ;
                                                                resetForms() ;
                                                                }}>
            <span>×</span>
        </button>
       </Row>
        <Modal.Title as="h1" className="login-modal-text w-100 login-title" id="contained-modal-title-vcenter">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
       </svg>
       <br/>
       <div className="font-weight-bold">
            Sign In
        </div>
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
            className={`form-control-lg ${usernameValidity?"":"error-border"}`} 
            value = {username}
            onChange = {event => {
                                    setUsername(event.target.value) ;
                                    setUsernameValidity(true) ;
                                    setWrongLogin(false) ;
                                    }}
        />
        </InputGroup>
        <span className="validity-error h5" hidden={usernameValidity}>{usernameValidity?"":"E-mail format not correct!"}</span>        </Form.Group>
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
        className={`form-control-lg ${passwordValidity?"":"error-border"}`} 
        value = {password}
        onChange = {event => {
                                setPassword(event.target.value) ;
                                setPasswordValidity(true) ;
                                setWrongLogin(false) ;
                                }}
        /> 
        </InputGroup> 
        <span className="validity-error h5" hidden={passwordValidity}>{passwordValidity?"":"Password is too short (< 8 characters)!"}</span>   
        </Form.Group>
        <Form.Group>
        <Button variant="success" size="lg" block onClick={handleLogin}>{<h3>Login</h3>}{/*TODO: migliora*/}</Button>    
        <div className="h3 alert-danger login-modal-text" hidden={!wrongLogin}>{!wrongLogin?"":"Invalid E-mail and/or Password!"}</div>   
        <Nav.Link className="h5 login-modal-text w-100 forgot">Forgot Password?</Nav.Link>
        </Form.Group>
        </Form> 
        </Modal.Body>
        <Modal.Footer >
            <div className="h5 login-modal-text w-100">
                Don't have an account? <Nav.Link className="h4">Sign Up</Nav.Link>
            </div>
        </Modal.Footer>
      </Modal>
    );
};

export {LoginPage} ;