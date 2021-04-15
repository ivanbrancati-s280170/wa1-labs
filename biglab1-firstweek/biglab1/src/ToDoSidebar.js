//TODO: toggler non funziona
import {Col, ListGroup} from 'react-bootstrap'
const filters = ['Important', 'Today', 'Next 7 Days', 'Private'] ;

const SidebarListElements = (props) => {
    const elements = props.elements ;
    const listItems = elements.map( (element) => <ListGroup.Item action href="#" className="sidebar-left-elem" key = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"} id = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"}>{element}</ListGroup.Item>) ;
    // Unshift of 'All' list element that is the active one by default
    listItems.unshift(<ListGroup.Item action href="#" className="sidebar-left-elem sidebar-left-elem-active" key = "all-sidebar" id = "all-sidebar">All</ListGroup.Item>) ;
    return listItems
} ;                


const ToDoSidebar = (props) => {
    return ( 
            <Col sm={4} as="aside" className="collapse d-sm-flex pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left" id="CollapsableSidebar">
                <SidebarListElements elements={filters}></SidebarListElements>        
            </Col> 
            ) ;  
} ;

export default ToDoSidebar ;