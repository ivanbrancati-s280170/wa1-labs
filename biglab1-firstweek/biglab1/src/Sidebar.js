//TODO: sistemare versione doppie -> versione singola
//TODO: creare lista 'dinamicamente'
//TODO: sistema meglio sidebar 2
const sidebar_elem_list = ['Important', 'Today', 'Next 7 Days', 'Private'] ;

const Sidebar2elements = (props) => {
    const elements = props.elements ;
    const listItems = elements.map( (element) => <a href="#" className="list-group-item list-group-item-action sidebar-left-elem" key = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"} id = {element.split(" ").join("-").charAt(0).toUpperCase() + element.slice(1, element.length)+"-sidebar"}>{element}</a>) ;
    listItems.unshift(<a href="#" className="list-group-item list-group-item-action sidebar-left-elem sidebar-left-elem-active" key = "all-sidebar" id = "all-sidebar">All</a>) ;
    return listItems
} ;

const Sidebar = (props) => {
    return ( 
            <nav className="d-none d-sm-flex col-sm-4 pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left">
                    <a href="#" className="list-group-item list-group-item-action sidebar-left-elem sidebar-left-elem-active" id = "all-sidebar">All</a>
                    <a href="#" className="list-group-item list-group-item-action sidebar-left-elem" id = "important-sidebar">Important</a>
                    <a href="#" className="list-group-item list-group-item-action sidebar-left-elem" id = "today-sidebar">Today</a>
                    <a href="#" className="list-group-item list-group-item-action sidebar-left-elem" id = "next_7_days-sidebar">Next 7 Days</a>
                    <a href="#" className="list-group-item list-group-item-action sidebar-left-elem" id= "private-sidebar">Private</a>
            </nav> 
            ) ;  
} ;

const Sidebar2 = (props) => {
    return ( 
            <nav className="d-none d-sm-flex col-sm-4 pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left">
            <Sidebar2elements elements={sidebar_elem_list}></Sidebar2elements>        
            </nav> 
            ) ;  
} ;
/*<!-- Sidebar -->
                <!--- Desktop version -->
                <nav class="d-none d-sm-flex col-sm-4 pt-3 pl-3 pr-3 list-group list-group-flush sidebar-left">
                    <a href="#" class="list-group-item list-group-item-action sidebar-left-elem sidebar-left-elem-active" id = "all-sidebar" aria-current="true">All</a>
                    <a href="#" class="list-group-item list-group-item-action sidebar-left-elem" id = "important-sidebar">Important</a>
                    <a href="#" class="list-group-item list-group-item-action sidebar-left-elem" id = "today-sidebar">Today</a>
                    <a href="#" class="list-group-item list-group-item-action sidebar-left-elem" id = "next_7_days-sidebar">Next 7 Days</a>
                    <a href="#" class="list-group-item list-group-item-action sidebar-left-elem" id= "private-sidebar">Private</a>
                </nav>

                <!--- Mobile Version -->
                <nav class="col-sm-4 pt-3 pl-3 pr-3 d-sm-none collapse list-group list-group-flush mobile-sidebar" id="CollapsableSidebar">
                    <a href="#" class="list-group-item list-group-item-action sidebar-left-elem sidebar-left-elem-active" id = "all-sidebar-mobile" aria-current="true">All</a>
                    <a href="#" class="list-group-item list-group-item-action sidebar-left-elem" id = "important-sidebar-mobile">Important</a>
                    <a href="#" class="list-group-item list-group-item-action sidebar-left-elem " id = "today-sidebar-mobile">Today</a>
                    <a href="#" class="list-group-item list-group-item-action sidebar-left-elem " id = "next_7_days-sidebar-mobile">Next 7 Days</a>
                    <a href="#" class="list-group-item list-group-item-action sidebar-left-elem " id = "private-sidebar-mobile">Private</a>
                </nav>*/

export default Sidebar2 ;