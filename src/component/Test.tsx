
import { Link, useLocation } from "react-router-dom";

import '../css/test.css'

export default function Test() {

    const location = useLocation();
    const color = location.state.color;
    const project_enter = document.getElementsByClassName('project-enter')[0];
    if (project_enter) {
        project_enter.remove();
    }
    return(
        <div 
            id="main" 
            style={{
                backgroundColor: color
            }}
        >   
        <div className="container post">
            <Link to={"/project"} id="close" />
            
        </div>
        </div>
    )
}