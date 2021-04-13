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

export default Sidebar ;