import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import '../css/header.css';
import img1 from '../img/sample_images_01.png';
import img2 from '../img/sample_images_02.png';
import img3 from '../img/sample_images_03.png';
import Draggable from "react-draggable";

export default function Header() {
    const isDark:String|null = localStorage.getItem('isDark');
    const [toggle, setToggle] = useState<boolean>(isDark==='on'?true:false);
    const clickedToggle = () => {
        setToggle((prev) => !prev);
    };
    
    useEffect(() => {
        if (toggle) {
            localStorage.setItem("isDark", 'on');
            document.getElementsByClassName('mode-toggle')[0].classList.add('active');
            document.getElementById('root')?.classList.add('dark');
        } else {
            localStorage.setItem("isDark", 'off');
            document.getElementsByClassName('mode-toggle')[0].classList.remove('active');
            document.getElementById('root')?.classList.remove('dark');
        }
    }, [toggle]);

    const items: {mushroom: number, potion: number} = {
        mushroom: Number(localStorage.getItem('mushroom')),
        potion: Number(localStorage.getItem('potion')),
    };
    const [moveItems, setItems] = useState(items);

    function addItems(item:string) {
        var i:number;
        switch(item) {
            case "mushroom" : case "potion":
                i = Number(moveItems[item]);
                if (i < 2) {
                    setItems((prevState) => {
                        var prev = {...prevState};
                        prev[item] = ++i;
                        localStorage.setItem(item, i+'');
                        return prev;
                    });
                }
                break;
            case "erase":
                localStorage.setItem("mushroom", "0");
                localStorage.setItem("potion", "0");
                setItems({mushroom: 0, potion: 0})
                break;
        }
    }
    useEffect(() => {
        const down:HTMLElement = document.getElementById('down') as HTMLElement;
        if (moveItems.mushroom === 2) {
            down.classList.add('mushroom');
            down.classList.replace('mushroom', 'mushroom2');
        } else if (moveItems.mushroom === 1) {
            down.classList.add('mushroom');
        } else if (moveItems.mushroom === 0) {
            down.classList.remove('mushroom');
            down.classList.remove('mushroom2');
        }

        if (moveItems.potion === 2) {
            down.classList.add('potion');
            down.classList.replace('potion', 'potion2');
        } else if (moveItems.potion === 1) {
            down.classList.add('potion');
        } else if (moveItems.potion === 0) {
            down.classList.remove('potion');
            down.classList.remove('potion2');
        }
    }, [moveItems]);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const dragOn = (e:any) => {
        const down:HTMLElement = document.getElementById('down') as HTMLElement;
        if (e.pageY >= 78 || (isMobile && e.changedTouches[0].pageY >= 78)) {
            down.classList.add('dropPossible')
        } else {
            down.classList.remove('dropPossible')
        }
    }
    const dragStop = (e: any) => {
        const down:HTMLElement = document.getElementById('down') as HTMLElement;
        if(down.classList.contains('dropPossible')) {
            let id:string = e.target.id;
            addItems(id);
        }
        down.classList.remove('dropPossible')

    };

    const mushroomRef = useRef(null);
    const potionRef = useRef(null);
    const eraseRef = useRef(null);

    const location = useLocation();
    const Home = () => {
        if (location.pathname === '/') {
            return <span className="reload" onClick={reload}>Home</span>;
        } else {
            return <Link to='/'>Home</Link>;
        }
    }
    const reload = () => {
        window.location.reload();
    }

    return (
        <nav>
            <div className="nav-item nav-home">
                {Home()}
            </div>
            <div className="nav-item mode-toggle">
                <span onClick={clickedToggle}>
                    <i className="fa-regular fa-sun"></i>
                    <i className="fa-regular fa-moon"></i>
                    Mode
                </span>
            </div>
            <div className="nav-item source">
                <Draggable
                    nodeRef={mushroomRef}
                    onDrag={(e) => dragOn(e)}
                    onStop={(e) => dragStop(e)}
                    position={{x:0, y:0}}
                >
                    <div className="source-item a" 
                    id="mushroom"
                    ref={mushroomRef}
                    style={{
                        backgroundImage: `url(${img1})`,
                        backgroundSize: "100% 100%"
                    }}>
                        &nbsp;
                    </div>
                </Draggable>
                <Draggable
                    nodeRef={potionRef}
                    onDrag={(e) => dragOn(e)}
                    onStop={(e) => dragStop(e)}
                    position={{x:0, y:0}}
                >
                    <div className="source-item" 
                    id="potion"
                    ref={potionRef}
                    style={{
                        backgroundImage: `url(${img2})`,
                        backgroundSize: "100% 100%"
                    }}>
                        &nbsp;
                    </div>
                </Draggable>
                <Draggable
                    nodeRef={eraseRef}
                    onDrag={(e) => dragOn(e)}
                    onStop={(e) => dragStop(e)}
                    position={{x:0, y:0}}
                >
                    <div className="source-item" 
                    id="erase"
                    ref={eraseRef}
                    style={{
                        backgroundImage: `url(${img3})`,
                        backgroundSize: "100% 100%"
                    }}>
                        &nbsp;
                    </div>
                </Draggable>
            </div>
        </nav>
    );
}
    