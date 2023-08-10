import Header from "./Header";
import { BaseSyntheticEvent, useEffect, useState } from "react";

import 'css/profile.css';
import ToTop from "./ToTop";
import { Link } from "react-router-dom";

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
    const removeSelect = () => {
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
                        <div className="square selector summary" onClick={(e) => select(e, 'summary')}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector project" onClick={(e) => select(e, 'project')}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector skills" onClick={(e) => select(e, 'skills')}>
                            <div className="color"></div>
                        </div>
                        <div className="square selector contact" onClick={(e) => select(e, 'contact')}>
                            <div className="color"></div>
                        </div>
                        <div className="square"></div>
                    </div>
                    <div className="profile">
                        <div className="profile-section"> {/* 자기소개 */}
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
                            <p>재미있는 아이디어를 상상하고 구현하는것을 즐기는 주니어 개발자입니다.</p>
                            <p>언제나 시도를 두려워하지 않으며, 문제에 직면하면 적극적으로 해결책을 찾아내고자 합니다. 이러한 자세로 다양한 프로젝트를 진행하고, 기술적인 도전과 성장을 지속적으로 추구합니다.</p>
                            <ul className="thinking">
                                <li>기본은 항상 중요하다고 생각하고 있습니다.</li>
                                <li>우물안 개구리가 되지않기 위해 끊임없이 고뇌하고 있습니다.</li>
                                <li>항상 참신한 시도를 해보려고 노력하고있습니다.</li>
                            </ul>
                            <div className="about-bundle">
                                <span>EMAIL : <a href="mailto:biten10@naver.com">biten10@naver.com</a></span>
                                <a href="https://github.com/Honey-Bi" target="_blink">
                                    <i className="fa-brands fa-github"></i>
                                    github
                                </a>
                            </div>
                        </div>
                        <div className="profile-section"> {/* 요약 */}
                            <div className="profile-sub" id="summary">summary</div>
                                <ul className="summary-list">
                                    <li>
                                        <p className="summary-title">Certificate</p>
                                        <ul>
                                            <li>Doc
                                                <ul className="summary-sub-list">
                                                    <li>ITQ - 아래한글 엑셀</li>
                                                    <li>GTQ 1급</li>
                                                    <li>GTQ 인디자인 1급</li>
                                                </ul>
                                            </li>
                                            <li>Develop
                                                <ul className="summary-sub-list">
                                                    <li>정보처리기능사 &#40;2016&#41;</li>
                                                    <li>웹디자인기능사 &#40;2018&#41;</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p className="summary-title">Education</p>
                                        <ul className="summary-sub-list">
                                            <li>세명컴퓨터고등학교 졸업
                                                <ul className="normal">
                                                    <li>스마트 콘텐츠과</li>
                                                    <li>2016.03 ~ 2018.02</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                        </div>
                        <div className="profile-section"> {/* 프로젝트 */}
                            <div className="profile-sub" id="project">project</div>
                            <div className="profile-project">
                                <p>
                                    <Link className="profile-project-title" to='/project/post/Portfolio'>Portfolio Project</Link>    
                                    <span className="date">2023 july</span>
                                    <a href="https://github.com/Honey-Bi" target="_blink" className="github">
                                        <i className="fa-brands fa-github"></i>
                                        github
                                    </a>
                                </p>
                                <span>현재 보고있는 포트폴리오 페이지로 React, Typescript를 사용하여 제작하였습니다.</span>
                            </div>
                            <div className="profile-project">
                                <p>
                                    <Link className="profile-project-title" to='/project/post/Oraculum'>Oraculum</Link>
                                    <span className="date">2023 june</span>
                                </p>
                                <span>간단한 의사결정 시뮬레이션 게임으로 Node.js를 사용하여 1인 제작하였습니다.</span>
                            </div>
                            <div className="profile-project">
                                <p>
                                    <Link className="profile-project-title"  to='/project/post/Plant'>Plant-Tree</Link>
                                    <span className="date">2023 july</span>
                                </p>
                                <span>canvas를 사용한 애니메이션 프로젝트로, React, Typescript만을 사용하여 canvas 애니메이션을 제작하였습니다.</span>
                            </div>
                        </div>
                        <div className="profile-section"> {/* 기술 스택 */}
                            <div className="profile-sub" id="skills">skills</div>
                            <ul className="skill_list">
                                <li>FrontEnd
                                    <ul className="skill_down">
                                        <li>HTML CSS JS</li>
                                        <li>TypeScript</li>
                                        <li>Jquery</li>
                                        <li>React</li>
                                    </ul>
                                </li>
                                <li>BackEnd
                                    <ul className="skill_down">
                                        <li>Node.js</li>
                                    </ul>
                                </li>
                                <li>Data
                                    <ul className="skill_down">
                                        <li>MySQL</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="profile-section"> {/* contact */}
                            <div className="profile-sub" id="contact">contact</div>
                            <div className="contact-bundle">
                                <span>EMAIL : <a href="mailto:biten10@naver.com">biten10@naver.com</a></span>
                                <a href="https://github.com/Honey-Bi" target="_blink">
                                    <i className="fa-brands fa-github"></i>
                                    github
                                </a>
                            </div>
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