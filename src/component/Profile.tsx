import Header from "./Header";
import { BaseSyntheticEvent, useEffect, useState } from "react";

import 'css/profile.css';
import ToTop from "./ToTop";

export default function Profile() {

    const [selector, setSelector] = useState<Element|null>(null);
    const [beforeSame, setBeaforeSave] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);

    const select = (e:BaseSyntheticEvent, id:string):void => {
        let select_element:Element = e.target;
        if (select_element.classList.contains('color')) {
            select_element = e.target.parentNode;
        }
        
        selector?.classList.remove('active');
        select_element.classList.add('active');
        
        if (selector === select_element && beforeSame) {
            selector.classList.remove('active');
            setBeaforeSave(false);
        } else {
            setBeaforeSave(true);
        }
        setSelector(select_element);
        
        const move = document.getElementById(id);
        move?.scrollIntoView({behavior:"smooth", block:"center"});
    }
    const removeSelect = (e:BaseSyntheticEvent) => {
        if (selector) selector.classList.remove('active');
    };

    useEffect(() => {
        const names:HTMLCollection = document.getElementsByClassName('name');
        const interval:NodeJS.Timer  = setInterval(() => {
            if(count === names.length - 1) {
                setCount(0);
            } else {
                countUp()
            }
        }, 1000*10);
        
        names[count].classList.remove('exit');
        names[count].classList.add('active');
        if(count === 0) {
            names[names.length-1].classList.remove('active');
            names[names.length-1].classList.add('exit');
        } else {
            names[count - 1].classList.remove('active');
            names[count - 1].classList.add('exit');
        }
        return () => clearInterval(interval);
    }, [count]);

    const countUp = () => {
        setCount((prev) => prev + 1);
    }

    return(
        <div id="main" className="scroll">
            <Header/>
            <div id="top"></div>
            <div id="down"
                onWheel={removeSelect}
                onTouchMove={removeSelect}
            >
                <div className="container" id="profile">
                    <div className="time-line">
                        <div className="line"></div>
                        <div className="square"></div>
                        <div className="square selector about" onClick={(e) => select(e, 'about')}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector test1" onClick={(e) => select(e, '')}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector concept" onClick={(e) => select(e, '')}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector making" onClick={(e) => select(e, '')}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector skills" onClick={(e) => select(e, 'skills')}>
                            <div className="color"></div>
                        </div>
                        <div className="square"></div>
                    </div>
                    <div className="profile">
                        <div className="profile-about">
                            <div className="profile-sub" id="about">about me</div>
                            <div className="profile-name">
                                <div className="name-hidden">&nbsp;</div>
                                <div className="names">
                                    <div className="name">류현비</div>
                                    <div className="name">HyueonBi Yu</div>
                                    <div className="name">柳賢飛</div>
                                    <div className="name">HB</div>
                                </div>
                            </div>
                            {/* <p>반갑습니다. 저는 크리에이터이자 개발자입니다. <br/>주로 웹개발을 담당하고 있으며, <span className="accent">항상 새로운 도전</span>을 하려는 자세로 개발을 하고 있습니다.</p> */}
                            <div className="profile-contact">
                                <span>EMAIL : <a href="mailto:biten10@naver.com">biten10@naver.com</a></span>
                                <a href="https://github.com/Honey-Bi" target="_blink">
                                    <i className="fa-brands fa-github"></i>
                                    github
                                </a>
                            </div>
                            
                        </div>
                        <div className="dummy"></div>
                        <div className="profile-skills">
                            <div className="profile-sub" id="skills">skills</div>
                            <ul className="skill_list">
                                <li>FrontEnd
                                    <ul className="skill_down">
                                        <li>TypeScript</li>
                                        <li>Jquery</li>
                                        <li>React</li>
                                    </ul>
                                </li>
                                <li>BackEnd
                                    <ul className="skill_down">
                                        <li>Express</li>
                                        <li>MongoDB</li>
                                    </ul>
                                </li>
                                <li>Data
                                    <ul className="skill_down">
                                        <li>SQL</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <ToTop color='#fff'/>
                </div>
                <div className="profile-title">
                    profile
                </div>
            </div>
        </div>
    )
};