import Header from "./Header";
import { useEffect, useState } from "react";

import '../css/profile.css';

export default function Profile() {

    const [selector, setSelector] = useState<Element|null>(null);
    const [beforeSame, setBeaforeSave] = useState<boolean>(true);
    const select = (e:any):void => {
        let select_element:Element = e.target;
        if (select_element.classList.contains('color')) {
            select_element = e.target.parentNode;
        }

        selector?.classList.remove('active');
        select_element.classList.add('active');

        if (selector === select_element && beforeSame) {
            selector?.classList.remove('active');
            setBeaforeSave(false);
        } else {
            setBeaforeSave(true);
        }
        setSelector(select_element);

    }

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const names:HTMLCollection = document.getElementsByClassName('name');
        const interval:NodeJS.Timer  = setInterval(() => {
            if(count === names.length - 1) {
                setCount(0);
            } else {
                countUp()
            }
        }, 1000*10);

        names[count].classList.add('active');
        if(count === 0) {
            names[names.length-1].classList.remove('active');
        } else {
            names[count - 1].classList.remove('active');
        }
        return () => clearInterval(interval);
    }, [count]);

    const countUp = () => {
        setCount((prev) => prev + 1);
    }

    return(
        <div id="main" className="scroll">
            <Header/>
            <div id="down">
                <div className="container">
                <div className="time-line">
                        <div className="line"></div>
                        <div className="square"></div>
                        <div className="square selector project" onClick={(e) => select(e)}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector test1" onClick={(e) => select(e)}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector concept" onClick={(e) => select(e)}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector making" onClick={(e) => select(e)}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector profile1" onClick={(e) => select(e)}>
                            <div className="color"></div>
                        </div>
                        <div className="square"></div>
                    </div>
                    <div className="profile">
                        <div className="names">
                            <div className="name">유현비</div>
                            <div className="name">HyueonBi Yu</div>
                            <div className="name">柳賢飛</div>
                            <div className="name">HB</div>
                        </div>
                        {/* <p>반갑습니다. 저는 크리에이터이자 개발자입니다. <br/>주로 웹개발을 담당하고 있으며, <span className="accent">항상 새로운 도전</span>을 하려는 자세로 개발을 하고 있습니다.</p> */}
                        
                    </div>
                    
                </div>
                <div className="container"></div>
            </div>
        </div>
    )
};