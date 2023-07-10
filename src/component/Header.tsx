import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../css/header.css';

export default function Header() {
    const isDark:String|null = localStorage.getItem('isDark');
    const [toggle, setToggle] = useState<boolean>(isDark==='on'?true:false);
    const clickedToggle = () => {
        setToggle((prev) => !prev);
    };
    
    useEffect(() => {
        console.log(toggle);
        if (toggle) {
            localStorage.setItem("isDark", 'on');
            document.getElementsByClassName('mode-toggle')[0].classList.add('active');
            document.getElementById('root')?.classList.add('dark');
        } else {
            localStorage.setItem("isDark", 'off');
            document.getElementsByClassName('mode-toggle')[0].classList.remove('active');
            document.getElementById('root')?.classList.remove('dark');
        }
    });
    
    let posX:number, posY:number;
    const dragStartHandler = (e: any) => {
        console.log('start');
        posX = e.clientX;
        posY = e.clientY;
    };
    const dragHandler = (e: any) => {
        e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
        e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
        posY = e.clientY;
        posX = e.clientX;
    };
    const dragEndHandler = (e: any) => {        
        e.target.style.left = 0;
        e.target.style.top = 0;
        console.log('end');
    };

    return (
        <nav>
            <div className="nav-item nav-home">
                <Link to='/'>Home</Link>
            </div>
            <div className="nav-item source">
                <div className="source-item">
                    <div className="a" draggable onDragStart={(e) => dragStartHandler(e)} onDrag={(e) => dragHandler(e)} onDragEnd={(e) => dragEndHandler(e)}>a</div>
                </div>
                <div className="source-item">
                    <div className="b" draggable onDragStart={(e) => dragStartHandler(e)} onDrag={(e) => dragHandler(e)} onDragEnd={(e) => dragEndHandler(e)}>b</div>
                </div>
                <div className="source-item">
                    <div className="c" draggable onDragStart={(e) => dragStartHandler(e)} onDrag={(e) => dragHandler(e)} onDragEnd={(e) => dragEndHandler(e)}>c</div>
                </div>
            </div>
            <div className="nav-item mode-toggle">
                <span onClick={clickedToggle}>
                    <i className="fa-regular fa-sun"></i>
                    <i className="fa-regular fa-moon"></i>
                    Mode
                </span>
            </div>
        </nav>
    );
}
    