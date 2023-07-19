
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
            <div className="project-nav">
                <Link to={"/"} className="project-home" />
                <Link to={"/project"} className="project-exit" />
            </div>
            <div className="container post-transition">
                <div className="post">
                    <div className="post-title">제목</div>
                    <div className="post-body">
                        내용
                    </div>
                </div>
            </div>
        </div>
    )
}