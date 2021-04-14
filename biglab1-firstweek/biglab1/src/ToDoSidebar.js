//TODO: toggler non funziona
const filters = ['Important', 'Today', 'Next 7 Days', 'Private'] ;

const SidebarListElements = (props) => {
    const elements = props.elements ;
    const listItems = elements.map( (element) => <a href="#" className="list-group-item list-group-item-action sidebar-left-elem" key = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"} id = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"}>{element}</a>) ;
    // Unshift of 'All' list element that is the active one by default
    listItems.unshift(<a href="#" className="list-group-item list-group-item-action sidebar-left-elem sidebar-left-elem-active" key = "all-sidebar" id = "all-sidebar">All</a>) ;
    return listItems
} ;                


const ToDoSidebar = (props) => {
    return ( 
            <aside className="collapse d-sm-flex col-sm-4 pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left" id="CollapsableSidebar">
                <SidebarListElements elements={filters}></SidebarListElements>        
            </aside> 
            ) ;  
} ;

export default ToDoSidebar ;