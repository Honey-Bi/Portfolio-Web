
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import 'css/post.css'
import ToTop from "./ToTop";
import posts from'post.json';

export default function Post() {
    const navigate = useNavigate();
    const location = useLocation();
    let color:string = "#ccc";
    
    if (location.state) color = location.state.color;
    
    const { pname }= useParams();
    if (
        pname === undefined || 
        (pname !== undefined && !Object.keys(posts).includes(pname))
    ) return (<>{navigate('/404')}</>);

    const data = Object.values(posts)[Object.keys(posts).indexOf(pname)];

    const project_enter:Element|null = document.getElementsByClassName('project-enter')[0];
    if (project_enter) project_enter.remove();

    const isDark:String|null = localStorage.getItem('isDark');
    const root = document.getElementById('root');
    if (root !== null && isDark === 'on') {
        root.classList.add('dark');
    }   
    return(
        <div 
            id="main" className="not-dark scroll"
            style={{
                backgroundColor: color
            }}
        >
            <div id="top"></div>
            <div className="project-nav"
            style={{
                backgroundColor: color
            }}>
                <Link to={"/"} className="project-home" />
                <Link to={"/project"} className="project-exit" />
            </div>
            <div className="container post-transition"> 
                <div className="post">
                    <div className="post-title">{data.title}</div>
                    <div className="post-sub">
                        <div className="post-category">
                            {data.category} / {data.author}
                        </div>
                        <div className="post-date">{data.date}</div>
                    </div>
                    <div className="post-body">
                    </div>
                </div>
                <ToTop color='#fff'/>
            </div>
        </div>
    )
}