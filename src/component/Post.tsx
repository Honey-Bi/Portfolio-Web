
import { Link, useLocation, useParams } from "react-router-dom";
import '../css/post.css'
import ToTop from "./ToTop";
import Post1 from "./post/Test";
import { useEffect, useState } from "react";
import Post2 from "./post/Test2";

export default function Post() {
    const location = useLocation();
    const color = location.state.color;
    const { pname } = useParams();
    const project_enter:Element|null = document.getElementsByClassName('project-enter')[0];
    if (project_enter) project_enter.remove();

    const [post, setPost] = useState<JSX.Element|null>(null);
    const [once, setOnce] = useState<boolean>(true);

    useEffect(() => {
        const project_post:Element|null = document.getElementsByClassName('post-transition')[0];
        if (project_post && once) {
            setOnce(false);
            switch(pname) {
                case 'test':
                    setPost(Post1());
                    break;
                case 'test2':
                    setPost(Post2());
                    break;
            }
        };
    }, [once, pname]);
    return(
        <div 
            id="main" className="scroll"
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
                {post}
                <ToTop color='#fff'/>
            </div>
        </div>
    )
}